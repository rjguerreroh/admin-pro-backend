const usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');
const Usuario = require('../models/usuario');

const login = async ( req, res) => {
    const { email, password } = req.body;
    try {
        // Verficar email
        const usuarioDB = await usuario.findOne({ email });

        if( !usuarioDB ){
            return res.status(404).json({
                ok: false,
                msg: 'Email no encontrado'
            });
        }

        // verificar contraseña
        const validPassword = bcrypt.compareSync(password, usuarioDB.password);
        if(!validPassword){
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña no valida'
            });
        }

        // Generar el TOKEN - JWT

        const token =  await generarJWT( usuarioDB.id );

        res.json({
            ok: true,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const googleSignIn = async( req, res ) => {
    const googleToken = req.body.token;
    try {
        const { name, email, picture } = await googleVerify(googleToken);
        const usuarioDB = await Usuario.findOne({ email });
        let usuario;

        if( !usuarioDB ){
            usuario = new Usuario({
                nombre: name,
                email,
                password: '@@',
                img: picture,
                google:true
            });
        }else{
            // Existe usuario
            usuario = usuarioDB;
            usuario.google = true;
        }

        // Generar el TOKEN - JWT

        const token =  await generarJWT( usuario.id );

        // Guardar en DB
        await usuario.save();

        res.json({
            ok: true,
            token
        });
    } catch (error) {
        res.json({
            ok: false,
            msg: 'Token no es correcto',
        });  
    }
}

module.exports = {
    login,
    googleSignIn
}