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

const actualizarHospital = async(req,res) => {
    const id = req.params.id;
    const uid = req.uid;
    try {
        const hospitalDB = await Hospital.findById(id);
        if(!hospitalDB){
            return res.status(404).json({
                ok: false,
                msg: 'Hospital no encontrado por id'
            });
        }

        const cambiosHospital = {
            nombre: req.body.nombre,
            usuario: uid
        }

        const hospitalActualizado = await Hospital.findByIdAndUpdate(id, cambiosHospital,{ new: true});
        res.json({
            ok: true,
            msg: 'actualizarHospital',
            hospital: hospitalActualizado
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false
        });
    }
}
const borrarHospital = async(req,res) => {
    const id = req.params.id;
    try {
        const hospitalDB = await Hospital.findById(id);
        if(!hospitalDB){
            return res.status(404).json({
                ok: false,
                msg: 'Hospital no encontrado por id'
            });
        }
        await Hospital.findByIdAndDelete(id);
        res.json({
            ok: true,
            msg: 'Hospital eliminado'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
        });
    }
}



module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
}