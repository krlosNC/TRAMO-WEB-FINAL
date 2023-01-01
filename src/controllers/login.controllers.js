//Invocamos a bcrypt
import bcryptjs from 'bcryptjs';
// Invocamos a la conexion de la DB
import connection from '../db.js';

// Por si quiero registrar un nuevo administrador
export const createAdmin = async (req, res)=>{
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
}

// Autenticación de login admin
export const auteticaAdmin = async (req, res)=> {
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
                req.session.email = results[0].email;
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
}

// CONTROLAR QUE EL AUTH ESTE EN TODAS LAS VISTAS DEL MODULO ADMINISTRADOR

export const controlerAdmin = (req, res)=> {
	if(req.session.loggedin){
        res.render('admin', {
            login: true,
            name: req.session.name
        });
    }else{
        res.render('404', {
            login: false
        })
    }
}

export const controlerSoli = (req, res)=> {
	if(req.session.loggedin){
        res.render('solicitudes-con', {
            login: true,
            name: req.session.name
        });
    }else{
        res.render('404', {
            login: false
        })
    }
}

export const controlerDatosCon = (req, res)=> {
	if(req.session.loggedin){
        res.render('datos-con', {
            login: true,
            name: req.session.name
        });
    }else{
        res.render('404', {
            login: false
        })
    }
}

export const controlerDatosClien = (req, res)=> {
	if(req.session.loggedin){
        res.render('datos-clien', {
            login: true,
            name: req.session.name
        });
    }else{
        res.render('404', {
            login: false
        })
    }
}

export const controlerHistorial = (req, res)=> {
	if(req.session.loggedin){
        res.render('historial', {
            login: true,
            name: req.session.name
        });
    }else{
        res.render('404', {
            login: false
        })
    }
}

export const controlerPqrs = (req, res)=> {
	if(req.session.loggedin){
        res.render('p-q-r-s', {
            login: true,
            name: req.session.name
        });
    }else{
        res.render('404', {
            login: false
        })
    }
}

export const controlerPerfil = (req, res)=> {
	if(req.session.loggedin){
        res.render('perfil-admin', {
            login: true,
            name: req.session.name,
            email: req.session.email
        });
    }else{
        res.render('404', {
            login: false
        })
    }
}

export const controlerManifiesto = (req, res)=> {
	if(req.session.loggedin){
        res.render('manifiesto', {
            login: true,
            name: req.session.name
        });
    }else{
        res.render('404', {
            login: false
        })
    }
}

// CERRAR SESIÓN DEL MODULO ADMINISTRADOR
export const cerraSesion = (req, res)=> {
	req.session.destroy(()=>{
        res.redirect('/')
    })
}

// Para limpiar la caché luego de destruir sesión

export const limpiarCache = (req, res, next)=> {
    if (!req.user)
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    next();
}