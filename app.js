// Invocamos a Express
import express from 'express';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//Para poder capturar los datos del formulario (sin urlencoded nos devuelve "undefined")
app.use(express.urlencoded({extended:false}));
app.use(express.json());//además le decimos a express que vamos a usar json

//seteamos el directorio de assets
app.use('/resources',express.static('public'));
app.use('/resources', express.static(__dirname + '/public'));

//Establecemos el motor de plantillas
app.set('view engine','ejs');

//Invocamos a bcrypt
import bcryptjs from 'bcryptjs';

//variables de session
import session from 'express-session';
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));


// Invocamos a la conexion de la DB
import connection from './db.js';

// establecemos las rutas

	app.get('/', (req, res)=>{
		res.render('index')
	})

	app.get('/login',(req, res)=>{
		res.render('login');
	})

	app.get('/register',(req, res)=>{
		res.render('register');
	})

// Método para la REGISTRACIÓN
app.post('/register', async (req, res)=>{
	const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;

    let passHaas = await bcryptjs.hash(password, 8);
    connection.query('INSERT INTO users SET ?', {email:email, name:name, password:passHaas}, async(error, results)=>{
        if(error){
            console.log(error)
        }else{
            console.log("Si se ingreso el dato")
        }
    })
})

// Metodo para la autenticacion
app.post('/auth', async (req, res)=> {
	const adminMail = req.body.mailAdmin;
    const adminContra = req.body.passwordAdmin;

    let passHaas = await bcryptjs.hash(adminContra, 8)

     if(adminMail && adminContra){
        connection.query('SELECT * FROM users WHERE email=?', [adminMail], async (error , results)=>{
            if(results.length == 0 || !(await bcryptjs.compare(adminContra, results[0].password))){
                 res.render('login', {
                    alert: true,
                    alertTitle: "Error",
                    alertMessage: "USUARIO y/o CONTRASEÑA incorrecta",
                    alertIcon:'error',
                    showConfirmButton: true,
                    timer: false,
                    ruta: 'login'    
                });
            }else{
                req.session.loggedin = true;
                req.session.name = results[0].name;
                res.render('login', {
                    alert: true,
                    alertTitle: "Bienvenido administrador TRAMO",
                    alertMessage: " ¡LOGIN CORRECTO! ",
                    alertIcon: "success",
                    showConfirmButton: false,
                    timer: 1500,
                    ruta: 'admin'
                 })
            }
        })
    }else{
        res.render('login', {
            alert: true,
            alertTitle: "Advertencia",
            alertMessage: " ¡Por favor, llene los campos requeridos! ",
            alertIcon: "warning",
            showConfirmButton: true,
            timer: false,
            ruta: 'login'
         })
    }
});

// Método para controlar que está auth en todas las páginas
app.get('/admin', (req, res)=> {
	if(req.session.loggedin){
        res.render('admin', {
            login: true,
            name: req.session.name
        });
    }else{
        res.render('admin', {
            login: false,
            name: 'Debe iniciar sesión'
        })
    }
});

// Destruye la sesión.
app.get('/logout', function (req, res) {
	req.session.destroy(()=>{
        res.redirect('/')
    })
});


app.listen(3000, (req, res)=>{
    console.log('SERVIDOR CORRIENDO EN http://localhost:3000');
});