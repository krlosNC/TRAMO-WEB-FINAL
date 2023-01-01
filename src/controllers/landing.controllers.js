
// Pagina principal de aterrizaje
export const inicioPagina = (req, res)=>{
    res.render('index')
}

// Pagina login
export const loginPagina = (req, res)=>{
    res.render('login');
}

// Por si quiero rendirazar donde registrar un administrador
export const adminRegistro = (req, res)=>{
    res.render('register');
}