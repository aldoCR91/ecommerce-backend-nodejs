const {request, response} = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { genJWT } = require('../helpers/jwt');

// Crear nuevo usuario
const createUser = async (req = request, res = response) => {

    const {name, email, password} = req.body;

    try {

        let user = await User.findOne({email});

        if(user){
            return res.status(400).json({
                ok: false,
                msg: "Ya existe un usuario con este email"
            });
        }
        
        user = new User({name, email, password});

        // Encriptar la password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password,salt);

        await user.save();

        // Generar token
        const token = await genJWT(user.id, user.name);

        res.status(201).json({
            ok: true,
            msg: "register",
            name: user.name,
            email: user.email,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "No se creo el usuario comuniquese con el administrador"
        });
    }
};

// Login de usuario
const loginUser = async (req = request, res = response) => {

    const {email, password} = req.body;

    try {

        // Confirmamos que exista el usuario en la base de datos
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                ok: false,
                msg: "Usuario o password incorrectos 56"
            });
        }

        // Comparamos la password
        const validPassword = bcrypt.compareSync(password,user.password);
        if(!validPassword){
            return res.status(400).json({
                ok: false,
                msg: "Usuario o password incorrectos 65"
            });
        }

        // Generar JWT
        const token = await genJWT(user.id, user.name);

        return res.status(200).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        });

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "No se pudo iniciar sesion comuniquese con el administrador"
        });
    }

    res.status(200).json({
        ok: true,
        msg: "login",
        email,
        password
    });
}

// Renovar token de usuario
const renewToken = async (req = request, res = response) => {

    const {name, uid} = req;

    const token = await genJWT(uid,name);

    res.status(200).json({
        ok: true,
        token
    });
}

module.exports = {
    createUser,
    loginUser,
    renewToken
}