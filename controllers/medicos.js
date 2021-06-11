const Medico = require('../models/medico');
const getMedicos = async (req, res) => {
    const medicos = await Medico.find()
        .populate('usuario','nombre')
        .populate('hospital','nombre');
    res.json({
        ok: true,
        medicos
    });
}

const crearMedico = async (req, res) => {
    const uid = req.uid;
    const medico = new Medico({usuario:uid,...req.body});
    try {
        medicoDB = await medico.save();
        res.json({
            ok: true,
            medico: medicoDB
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Hable con el administrador"
        });
    }
}

const actualizarMedico = (req,res) => {
    const uid = req.params.id;
    res.json({
        ok: true,
        msg: 'actualizarMedico',
        uid: uid
    });
}

const borrarMedico = (req,res) => {
    const uid = req.params.id;
    res.json({
        ok: true,
        msg: 'borrarMedico',
        uid: uid
    });
}

module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
}