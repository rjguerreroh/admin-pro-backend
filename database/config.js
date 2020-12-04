const mongoose = require('mongoose');

const dbConnection = async () => {
    try{
        await mongoose.connect(process.env.DB_CNN,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log('DB online');
    }catch(error){
        console.log('Error');
        throw new error('Error al inciar la BD ver logs');
    }
};

module.exports = {
    dbConnection
}