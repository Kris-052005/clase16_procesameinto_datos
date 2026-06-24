import { Router } from 'express';
import { agregarUsuario, cambiarContrasena } from '../controllers/usuario.controller.js';

const router = Router();

router.post("/", agregarUsuario);
router.post("/agregar", agregarUsuario);
router.patch("/cambiar-contrasena", cambiarContrasena);

export default router;
