/*  
ESTE ARCHIVO DE RUTAS TENDRA TODAS LAS RUTAS DE LAS VISTAS Y REDERIZACION EN LA LANDING PAGE
Y LO QUE VA A PODER VER EL USUARIO HASTA EL LOGIN Y REGISTRO DE ADMINISTRADOR SI LLEGA A SER AGREGADO EN EL APP WEB TRAMO SOLO
LA RENDEIZACIÓN MAS NO LA FUNCIONALIDAD
*/

import { Router } from 'express';
import { inicioPagina, loginPagina, adminRegistro } from '../controllers/landing.controllers.js'

const router = Router()

// pagina de aterrizaje
router.get('/', inicioPagina);

// pagina de login para acceder a modulo administrador
router.get('/login', loginPagina);

// pagina para acceder a registrar un administrador
router.get('/register', adminRegistro);

export default router