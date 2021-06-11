const {Schema, model} = require('mongoose');

const HospitalSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    img:{
        type: String,
    },
    usuario: {
        require: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }
}, { collection: 'Hospitales'});

// Collection: 'Hospitales' => con esto indicamos a la base de datos que se guarde como Hospitales y no como Hospitals

HospitalSchema.method('toJSON', function() {
    const { __v, password, ...object} = this.toObject();
    return object;
});

module.exports = model('Hospital', HospitalSchema);