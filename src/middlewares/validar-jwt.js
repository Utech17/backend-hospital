const { response, request } = require('express')
const jwt=require('jsonwebtoken');
const Usuario = require('../models/usuario.model');
const validarJWT=async (req=request,res=response,next)=>{
    const token=req.header('x-token'); //asi obtengo los headers
    if(!token){
        return res.status(401).json({
            msj:'No hay token en la peticion'
        })
    }
    try {
        const {uid}=jwt.verify(token,process.env.SECRET_KEY);
        const usuarioAuth=await Usuario.findById(uid); 
        req.usuarioAuth=usuarioAuth;//se crea una nueva variable en la req y se guarda el uid
        if(!usuarioAuth){
            return res.status(401).json({
                msj:'El usuario no existe'
            })
        }
        if(!usuarioAuth.estado){
            return res.status(401).json({
                msj:'El usuario se encuentra deshabilitado'
            })
        }
        next();
    } catch (error) {
        console.log('Token no valido')
        return res.status(401).json({
            msj:'Token no valido'
        })
    }
}
module.exports={
    validarJWT
}