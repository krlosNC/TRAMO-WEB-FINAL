/*  
ESTE ARCHIVO DE RUTAS TENDRA TODAS LA VALIDACIONES Y FUNCIONALIDAD AL MOMENTO DE INICIAR SESIÓN COMO ADMINISTRADOR TRAMO DESDE EL
COMPORTAMIENTO MIENTRAS LA SESION ESTA ACTIVA EN MODULO ADMINISTRADOR HASTA EL SALIR DE SESIÓN Y LA DESTRUCCIÓN DE ESTA Y ASI MISMO LA LIBERACIÓN DE CACHE
DE LA MISMA
*/
import { Router } from 'express';
import { createAdmin, auteticaAdmin, controlerAdmin, cerraSesion, limpiarCache, controlerSoli, controlerDatosCon, controlerDatosClien, controlerHistorial, controlerPqrs, controlerPerfil, controlerManifiesto } from '../controllers/login.controllers.js'

const router = Router()

// Método para la REGISTRACIÓN EN CASO DE AGREGAR QUE SE REGISTRE UN ADMINISTRADOR
router.post('/register', createAdmin)

// Metodo para la autenticacion
router.post('/auth', auteticaAdmin);

// Método para controlar que está auth en todas las vistas del modulo administrador y validación si la sesión esta activa o no
// AQUI DEBERAN ESTAR TODAS LAS VISTAS QUE TENDRA EL MODULO ADMINISTRADOR
router.get('/admin', controlerAdmin);
router.get('/solicitudes-con', controlerSoli);
router.get('/datos-con', controlerDatosCon);
router.get('/datos-clien', controlerDatosClien);
router.get('/historial', controlerHistorial);
router.get('/p-q-r-s', controlerPqrs);
router.get('/perfil', controlerPerfil);
router.get('/manifiesto', controlerManifiesto);

// Destruye la sesión.
router.get('/logout', cerraSesion);

// Para limpiar la caché luego de destruir sesión
router.use(limpiarCache);


export default router