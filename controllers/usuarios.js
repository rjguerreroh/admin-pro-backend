const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

// const { response } = require('express');

const getUsuarios = async (req, res) => {
    const desde = Number(req.query.desde || 0) ;
    // const usuario = await Usuario
    //     .find({},'nombre email role google')
    //     .skip(desde)
    //     .limit(5);
    
    // const total = await Usuario.count();

    const [usuarios,total] =await Promise.all([
            Usuario
            .find({},'nombre email role google img')
            .skip(desde)
            .limit(5),
        Usuario.countDocuments()
    ]);
    res.json({
        ok: true,
        usuarios,
        total
    });
}

const crearUsuario = async (req, res) => {
    console.log('req body', req.body);
    const { email, password, nombre} = req.body;
    try {
        const existEmail = await Usuario.findOne({ email });
        if(existEmail){
            res.status(400).json({
                ok: false,
                msg: 'El correo ya esta registrado'
            });
        }

        const usuario = new Usuario(req.body);

        // Encriptar contraseña

        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt);

        //Guardar usuario
        await usuario.save();

        const token =  await generarJWT(usuario.id);

        res.json({
            ok: true,
            usuario,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }
}

const actualizarUsuario = async ( req, res) =>{
    const uid = req.params.id;
    try {
        const usuarioDB = await Usuario.findById( uid );

        if( !usuarioDB ){
            return res.status(404).json({
                ok: false,
                msg: 'No existe usuario por ese id'
            });
        }

        const { password, google, email, ...campos} = req.body;
        if( usuarioDB.email !== req.body.email ){
            const existEmail = await Usuario.findOne({ email });
            if(existEmail){
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con ese email'
                });
            }
        }

        campos.email = email;


        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, {new: true});
        res.json({
            ok: true,
            usuario: usuarioActualizado
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }
}

const borrarUsuario = async (req, res) => {
    const uid = req.params.id;
    try {
        const usuarioDB = await Usuario.findById( uid );

        if( !usuarioDB ){
            return res.status(404).json({
                ok: false,
                msg: 'No existe usuario por ese id'
            });
        }

        await Usuario.findByIdAndDelete( uid );

        res.json({
            ok: true,
            msg: 'Usuario eliminado'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: true,
            msg: 'Hable con el administrador'
        });
    }
}

module.exports = {
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario
}