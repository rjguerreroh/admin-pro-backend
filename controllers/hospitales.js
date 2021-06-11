const Hospital = require('../models/hospital');

const getHospitales = async(req, res) => {
    const hospitales = await Hospital.find().populate('usuario', 'nombre img');
    console.log('get hospitales bien');
    console.log('Hospitales', hospitales);
    res.json({
        ok: true,
        hospitales
    });
}

const crearHospital = async (req, res) => {
    const uid = req.uid; // el uid es obtenido de la validacion token
    const hospital = new Hospital({usuario: uid,...req.body});
    try {
        const hospitalDB = await hospital.save();
        res.json({
            ok: true,
            hospital: hospitalDB
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const actualizarHospital = (req,res) => {
    const uid = req.params.id;
    res.json({
        ok: true,
        msg: 'actualizarHospital',
        uid: uid
    });
}

const borrarHospital = (req,res) => {
    const uid = req.params.id;
    res.json({
        ok: true,
        msg: 'borrarHospital',
        uid: uid
    });
}

module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
}