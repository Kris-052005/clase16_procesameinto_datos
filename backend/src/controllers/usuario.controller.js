import bcrypt from 'bcrypt';
import pool from '../../config/config/db.js';

function validarCorreo(correo) {
  const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regexCorreo.test(correo);
}


function validarContrasena(contrasena) {
  if (!contrasena || contrasena.length < 8) {
    return false;
  }

  const tieneMinuscula = /[a-z]/.test(contrasena);
  const tieneMayuscula = /[A-Z]/.test(contrasena);
  const tieneNumero = /[0-9]/.test(contrasena);

  return tieneMinuscula && tieneMayuscula && tieneNumero;
}

export async function agregarUsuario(req, res) {
  let { nombre, correo, contrasena, confirmacion } = req.body;

  if (!nombre || nombre.trim() === "") {
    return res.status(400).json({ error: "El nombre es obligatorio" });
  }

  if (!correo || correo.trim() === "") {
    return res.status(400).json({ error: "El correo es obligatorio" });
  }

  if (!validarCorreo(correo)) {
    return res.status(400).json({
      error: "El correo debe cumplir con el formato de correo electrónico (ejemplo@correo.com)"
    });
  }

  if (!contrasena || contrasena.trim() === "") {
    return res.status(400).json({ error: "La contraseña es obligatoria" });
  }

  if (!confirmacion || confirmacion.trim() === "") {
    return res.status(400).json({ error: "La confirmación de contraseña es obligatoria" });
  }

  if (!validarContrasena(contrasena)) {
    return res.status(400).json({
      error: "La contraseña debe tener mínimo 8 caracteres, incluir mayúsculas, minúsculas y números"
    });
  }

  if (contrasena !== confirmacion) {
    return res.status(400).json({
      error: "La contraseña y la confirmación no coinciden"
    });
  }

  try {
    contrasena = await bcrypt.hash(contrasena, 10);

    const [result] = await pool.execute(
      "INSERT INTO usuarios (nombre, correo, `contraseña`) VALUES (?, ?, ?)",
      [nombre, correo, contrasena]
    );

    return res.status(201).json({
      mensaje: "Usuario agregado correctamente",
      usuario: {
        id: result.insertId,
        nombre,
        correo,
        fechaRegistro: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Error al insertar usuario:', error);
    
    if (error && error.sqlMessage && /Unknown column/.test(error.sqlMessage)) {
      try {
        const [columns] = await pool.query(`SHOW COLUMNS FROM usuarios`);
        return res.status(500).json({ error: error.sqlMessage, columns });
      } catch (innerErr) {
        console.error('Error al obtener columnas de usuarios:', innerErr);
        return res.status(500).json({ error: error.sqlMessage || 'Error interno del servidor' });
      }
    }

    return res.status(500).json({ error: error.sqlMessage || "Error interno del servidor" });
  }
}

export async function cambiarContrasena(req, res) {
  const { usuarioId, contrasenaActual, contrasenaNueva, confirmacionNueva } = req.body;

  if (!usuarioId || usuarioId === "") {
    return res.status(400).json({ error: "El ID del usuario es obligatorio" });
  }

  if (!contrasenaActual || contrasenaActual.trim() === "") {
    return res.status(400).json({ error: "La contraseña actual es obligatoria" });
  }

  if (!contrasenaNueva || contrasenaNueva.trim() === "") {
    return res.status(400).json({ error: "La nueva contraseña es obligatoria" });
  }

  if (!confirmacionNueva || confirmacionNueva.trim() === "") {
    return res.status(400).json({ error: "La confirmación de la nueva contraseña es obligatoria" });
  }

  if (contrasenaNueva !== confirmacionNueva) {
    return res.status(400).json({ error: "La nueva contraseña y su confirmación no coinciden" });
  }

  if (!validarContrasena(contrasenaNueva)) {
    return res.status(400).json({
      error: "La nueva contraseña debe tener mínimo 8 caracteres, incluir mayúsculas, minúsculas y números"
    });
  }

  try {
    const [rows] = await pool.execute(
      "SELECT `contraseña` FROM usuarios WHERE id = ?",
      [usuarioId]
    );

    if (!rows || rows.length === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const hashedPassword = rows[0].contraseña;
    const contrasenaValida = await bcrypt.compare(contrasenaActual, hashedPassword);

    if (!contrasenaValida) {
      return res.status(401).json({ error: "La contraseña actual es incorrecta" });
    }

    const nuevaContrasenaHasheada = await bcrypt.hash(contrasenaNueva, 10);
    await pool.execute(
      "UPDATE usuarios SET `contraseña` = ? WHERE id = ?",
      [nuevaContrasenaHasheada, usuarioId]
    );

    return res.status(200).json({ mensaje: "Contraseña actualizada correctamente" });
  } catch (error) {
    console.error('Error al cambiar la contraseña:', error);
    return res.status(500).json({ error: error.sqlMessage || "Error interno del servidor" });
  }
}
