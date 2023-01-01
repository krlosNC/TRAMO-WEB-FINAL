// Invocamos a Express
import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import landingRoutes from './routes/landing.routes.js'
import loginRoutes from './routes/login.routes.js'
import adminRoutes from './routes/admin.routes.js'


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
// PAGINA DE ATERRIZAJE LANDING PAGE VISTAS
app.use(landingRoutes);

// PAGINA LOGIN PARA ENTRAR A MODULO ADMINISTRADOR
app.use(loginRoutes);

// MODULO ADMINISTRADOR VISTAS Y RENDERIZACIÓN DE ESTAS
app.use(adminRoutes);

app.use((req, res, next) => {
    return res.render('404')
})

export default app;