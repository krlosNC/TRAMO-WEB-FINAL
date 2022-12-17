import { Router } from 'express';
import { inicioPagina, loginPagina, adminRegistro, createAdmin, auteticaAdmin, controlerAdmin, cerraSesion, limpiarCache } from '../controllers/login.controllers.js'

const router = Router()

// establecemos las rutas
router.get('/', inicioPagina)

router.get('/login', loginPagina)

router.get('/register', adminRegistro)

// Método para la REGISTRACIÓN
router.post('/register', createAdmin)

// Metodo para la autenticacion
router.post('/auth', auteticaAdmin);

// Método para controlar que está auth en todas las páginas
router.get('/admin', controlerAdmin);

// Destruye la sesión.
router.get('/logout', cerraSesion);

// Para limpiar la caché luego de destruir sesión
router.use(limpiarCache);


export default router