// Pagina principal de aterrizaje administrador
export const disponiblesServicio = (req, res)=>{
    res.render('admin')
}

export const solicitudesConductores = (req, res)=>{
    res.render('solicitudes-con')
}

export const datosConductor = (req, res)=>{
    res.render('datos-con')
}

export const datosCliente = (req, res)=>{
    res.render('datos-clien')
}

export const historialViajes = (req, res)=>{
    res.render('historial')
}

export const Pqrs = (req, res)=>{
    res.render('p-q-r-s')
}

export const perfilAdmin = (req, res)=>{
    res.render('perfil-admin')
}