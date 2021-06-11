const usuario = require('../models/usuario');
const medico = require('../models/medico');
const hospital = require('../models/hospital');

const getSearch = async(req,res) => {
    const search = req.params.search || '';
    const regex = new RegExp(search, 'i'); // el parametro i indica que es insensible
    const [usuarios, medicos,hospitales] = await Promise.all([
        await usuario.find({nombre: regex}),
        await medico.find({nombre: regex}),
        await hospital.find({nombre: regex})
    ]);
    res.json({
        ok: true,
        usuarios,
        medicos,
        hospitales
    });
}

const getDocumentsCollection = async(req,res) => {
    const search = req.params.search || '';
    const table = req.params.table || '';
    console.log("tabla", table);
    console.log("search", search);
    const regex = new RegExp(search, 'i'); // el parametro i indica que es insensible
    let data = [];
    switch (table) {
        case 'usuarios':
            console.log('enro medicos');
            data = await usuario.find({nombre: regex})
                                .populate('usuario','nombre img');
            break;
        case 'hospitales':
            data = await hospital.find({nombre: regex})
                                    .populate('usuario','nombre img')
                                    .populate('hospital','nombre img');
            break;
        case 'medicos':
            data = await hospital.find({nombre: regex});
            break;
        default:
            return res.status(400).json({
                ok: false,
                msg: 'La tabla tiene que ser usuarios/medicos/hospitales'
            });
    }
    console.log('salio', data);
    res.json({
        ok: true,
        resultados: data 
    });
}


module.exports = {
    getSearch,
    getDocumentsCollection
}