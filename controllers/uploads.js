const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');
const { updateImagen } = require('../helpers/updateImage');
const fileUpload = (req, res) => {
    const { tipo, id } = req.params;
    const tiposValidos = ['hospitales','medicos','usuarios'];
    if(!tiposValidos.includes(tipo)){
        return res.status(400).json({
            ok: false,
            msg: 'No es un medico, usuario u hospital (tipo)'
        });
    }

    if(!req.files || Object.keys(req.files).length === 0){
        return res.status(400).json({
            ok: false,
            msg: 'No hay ningun archivo'
        });
    }

    const file = req.files.imagen;

    const nombreCortado = file.name.split('.');
    const extensionArchivo = nombreCortado[nombreCortado.length - 1];

    // Validar extension
    const extensionesValidas = ['png','jpg','jpeg','gif'];
    if(!extensionesValidas.includes(extensionArchivo)){
        return res.status(400).json({
            ok: false,
            msg: 'No es una extension permitida'
        });
    }

    //Generar el nombre del archivo

    const nombreArchivo = `${uuidv4()}.${extensionArchivo}`;

    // Path para guardar la imagen
    const path = `./uploads/${ tipo }/${ nombreArchivo }`;

    // Mover la imagen
    file.mv(path, (err) => {
        if (err){
            console.log(err);
            return res.status(500).json({
                ok: false,
                msg: 'Error al mover la imagen'
            });
        }

        // Actualizar base de datos
        updateImagen(tipo, id, nombreArchivo);
         
        res.json({
            ok: true,
            msg: 'Nombre archivo subido',
            nombreArchivo
        });
    });
    
};
const retornImage = ( req, res ) => {
    const { type, image } = req.params;
    let pathImg = path.join(__dirname, `../uploads/${type}/${image}`);
    console.log('path img', pathImg);
    if( fs.existsSync(pathImg)){
        res.sendFile( pathImg );
    }else{
        pathImg = path.join(__dirname, `../uploads/no-img.jpg`);
        res.sendFile( pathImg );
    }
}

module.exports = {
    fileUpload,
    retornImage
};