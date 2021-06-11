const fs = require('fs'); // esto maneja el fili system
const Usuario = require('../models/usuario');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');

const borrarImagen = (path) => {
    if( fs.existsSync(path)){
        console.log("Aqui entro bien");
        // Borrar la imagen anterior
        fs.unlinkSync(path);
    }
}
const updateImagen = async(tipo, id, nombreArchivo) => {
    let OldPath = '';
    switch (tipo) {
        case 'medicos':
            const medico = await Medico.findById(id);
            if(!medico){
                console.log('no es un medico por id');
                return false;
            }
            OldPath = `./uploads/medicos/${ medico.img }`;
            borrarImagen(OldPath);
            medico.img = nombreArchivo;
            await medico.save();
            return true; 
            break;
        case 'usuarios':
            const usuario = await Usuario.findById(id);
            if(!usuario){
                console.log('no es un usuario por id');
                return false;
            }
            OldPath = `./uploads/usuarios/${ usuario.img }`;
            borrarImagen(OldPath);
            usuario.img = nombreArchivo;
            await usuario.save();
            return true; 
            
            break;
        case 'hospitales':
            console.log('hospital update file bien');
            const hospital = await Hospital.findById(id);
            console.log('hospital update file bien', hospital);
            if(!hospital){
                console.log('no es un usuario por id');
                return false;
            }
            console.log('onj hospital ',hospital);
            OldPath = `./uploads/hospitales/${ hospital.img }`;
            borrarImagen(OldPath);
            hospital.img = nombreArchivo;
            await hospital.save();
            return true; 
            
            break;
    
        default:
            break;
    }
}

module.exports = {
    updateImagen
}