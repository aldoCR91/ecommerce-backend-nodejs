const {request,response} = require('express');
const jwt = require('jsonwebtoken');

const validarJWT = (req = request, res = response, next) => {

    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({
            ok: false,
            msg: "No hay token en la peticion"
        });
    }

    try {
        const {name,uid} = jwt.verify(
            token,
            process.env.SECRET_JWT_SEED
        );

        req.name = name;
        req.uid = uid;


    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: "Token no valido",
        });
    }

    //console.log(token);

    next();
}

module.exports = {
    validarJWT
}