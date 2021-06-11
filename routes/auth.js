const { Router} = require('express');
const { login, googleSignIn, renewToken } = require('../controllers/auth');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.post('/',[
    check('email', 'El campo es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validarCampos
],login);

router.post('/google',[
    check('token', 'El token de google es obligatorio').not().isEmpty(),
    validarCampos
],googleSignIn);

router.get('/', validarJWT, renewToken );


module.exports = router;