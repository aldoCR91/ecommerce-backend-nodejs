
const {Router} = require('express');
const { createUser, loginUser, renewToken } = require('../controller/auth');
const router = Router();
const {check} = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');


router.post(
    '/logup',
    [
        check('name', 'El nombre es requerido').not().isEmpty(),
        check('email','El email es requerido').isEmail(),
        check('password','El password debe tener al menos 8 caracteres').isLength({min: 8, max: 20}),
        validarCampos
    ],
    createUser
);

router.post(
    '/login',
    [
        check('email','El email es requerido').isEmail(),
        check('password','El password debe tener al menos 8 caracteres').isLength({min: 8, max: 20}),
        validarCampos
    ],
    loginUser
);

router.get('/renew', validarJWT ,renewToken);

module.exports = router;