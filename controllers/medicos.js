const hospital = require('../models/hospital');
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

const actualizarMedico = async(req,res) => {
    const id = req.params.id;
    const uid = req.uid;
    try {        
        const medico = await Medico.findById(id);
        if(!medico) {
            res.status(404).json({
                ok: false,
                msg: 'Medico no encontrado'
            });
        }
    
        const cambiosMedico = {
            nombre: req.body.nombre,
            usuario: uid,
            hospital: req.body.hospital
        }
    
        const medicoActualizado = await Medico.findByIdAndUpdate(id, cambiosMedico, { new: true });
    
        res.json({
            ok: true,
            medicoActualizado
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Ocurrio un error al actalizar"
        });
    }
}

const borrarMedico = async(req,res) => {
    const id = req.params.id;
    try {        
        const medico = await Medico.findById(id);
        if(!medico) {
            res.status(404).json({
                ok: false,
                msg: 'Medico no encontrado'
            });
        }
    
        await Medico.findByIdAndDelete(id);
    
        res.json({
            ok: true,
            msg: 'Medico Eliminado'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Ocurrio un error al Eliminar"
        });
    }
}

module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
}