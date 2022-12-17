// Invocamos a Express
import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import { inicioPagina, loginPagina, adminRegistro, createAdmin, auteticaAdmin, controlerAdmin, cerraSesion, limpiarCache } from './controllers/login.controllers.js'

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//Para poder capturar los datos del formulario (sin urlencoded nos devuelve "undefined")
app.use(express.urlencoded({extended:false}));
app.use(express.json());//además le decimos a express que vamos a usar json

//seteamos el directorio de assets
app.use('/resources',express.static('public'));
app.use('/resources', express.static(__dirname + '/public'));
app.set('views', (__dirname + '/views'));


//Establecemos el motor de plantillas
app.set('view engine','ejs');

//variables de session
import session from 'express-session';
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

/*=========================================*/

// establecemos las rutas
app.get('/', inicioPagina)

app.get('/login', loginPagina)

app.get('/register', adminRegistro)

// Método para la REGISTRACIÓN
app.post('/register', createAdmin)

// Metodo para la autenticacion
app.post('/auth', auteticaAdmin);

// Método para controlar que está auth en todas las páginas
app.get('/admin', controlerAdmin);

// Destruye la sesión.
app.get('/logout', cerraSesion);

// Para limpiar la caché luego de destruir sesión
app.use(limpiarCache);

export default app;