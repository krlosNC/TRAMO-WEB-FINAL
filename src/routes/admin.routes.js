/*  
ESTE ARCHIVO DE RUTAS TENDRA TODAS LAS VISTAS DE MODULO ADMINISTRADOR Y LA INTERACIÓN QUE SE TENDRA EN CADA UNA DE ELLAS
*/
import { Router } from 'express';
import { disponiblesServicio, solicitudesConductores, datosConductor, datosCliente, historialViajes, Pqrs, perfilAdmin } from '../controllers/admin.controllers.js'

const router = Router()

// establecemos las rutas
router.get('/admin', disponiblesServicio)

router.get('/solicitudes-con', solicitudesConductores)

router.get('/datos-con', datosConductor)

router.get('/datos-clien', datosCliente)

router.get('/historial', historialViajes)

router.get('/p-q-r-s', Pqrs)

router.get('/perfil', perfilAdmin)

export default router