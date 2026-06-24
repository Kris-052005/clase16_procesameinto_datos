import { useState } from 'react';
import axios from 'axios';
import '../styles/FormularioVehiculos.css';

export default function FormularioVehiculos() {
  const [formData, setFormData] = useState({
    placa: '',
    marca: '',
    modelo: '',
    color: '',
    propietario: '',
  });

  const [resultado, setResultado] = useState(null);
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [vehiculos, setVehiculos] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setResultado(null);
    setCargando(true);

    try {
      // Simulamos una respuesta del backend
      // En un caso real, esto iría a un endpoint del backend
      const nuevoVehiculo = {
        id: vehiculos.length + 1,
        ...formData,
        fechaRegistro: new Date().toLocaleDateString('es-CO'),
      };

      setVehiculos([...vehiculos, nuevoVehiculo]);
      setResultado(nuevoVehiculo);
      
      // Limpiamos el formulario
      setFormData({
        placa: '',
        marca: '',
        modelo: '',
        color: '',
        propietario: '',
      });
    } catch (err) {
      setError('Error al registrar el vehículo');
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="formulario-container">
      <div className="formulario-card">
        <h2>Registro de Vehículos</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="placa">Placa del Vehículo:</label>
            <input
              type="text"
              id="placa"
              name="placa"
              value={formData.placa}
              onChange={handleChange}
              placeholder="Ej: ABC123"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="marca">Marca:</label>
              <input
                type="text"
                id="marca"
                name="marca"
                value={formData.marca}
                onChange={handleChange}
                placeholder="Ej: Toyota"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="modelo">Modelo:</label>
              <input
                type="text"
                id="modelo"
                name="modelo"
                value={formData.modelo}
                onChange={handleChange}
                placeholder="Ej: Corolla"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="color">Color:</label>
              <input
                type="text"
                id="color"
                name="color"
                value={formData.color}
                onChange={handleChange}
                placeholder="Ej: Rojo"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="propietario">Propietario:</label>
              <input
                type="text"
                id="propietario"
                name="propietario"
                value={formData.propietario}
                onChange={handleChange}
                placeholder="Nombre completo"
                required
              />
            </div>
          </div>

          <button type="submit" disabled={cargando}>
            {cargando ? 'Registrando...' : 'Registrar Vehículo'}
          </button>
        </form>

        {error && <div className="error-message">{error}</div>}

        {resultado && (
          <div className="resultado">
            <h3>Vehículo Registrado</h3>
            <div className="resultado-item">
              <span className="label">Placa:</span>
              <span className="value">{resultado.placa}</span>
            </div>
            <div className="resultado-item">
              <span className="label">Marca:</span>
              <span className="value">{resultado.marca}</span>
            </div>
            <div className="resultado-item">
              <span className="label">Modelo:</span>
              <span className="value">{resultado.modelo}</span>
            </div>
            <div className="resultado-item">
              <span className="label">Color:</span>
              <span className="value">{resultado.color}</span>
            </div>
            <div className="resultado-item">
              <span className="label">Propietario:</span>
              <span className="value">{resultado.propietario}</span>
            </div>
            <div className="resultado-item">
              <span className="label">Fecha de Registro:</span>
              <span className="value">{resultado.fechaRegistro}</span>
            </div>
          </div>
        )}

        {vehiculos.length > 0 && (
          <div className="vehiculos-list">
            <h3>Vehículos Registrados ({vehiculos.length})</h3>
            <table>
              <thead>
                <tr>
                  <th>Placa</th>
                  <th>Marca</th>
                  <th>Modelo</th>
                  <th>Color</th>
                  <th>Propietario</th>
                  <th>Fecha</th>
                </tr>
              </thead>
              <tbody>
                {vehiculos.map((v) => (
                  <tr key={v.id}>
                    <td>{v.placa}</td>
                    <td>{v.marca}</td>
                    <td>{v.modelo}</td>
                    <td>{v.color}</td>
                    <td>{v.propietario}</td>
                    <td>{v.fechaRegistro}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
