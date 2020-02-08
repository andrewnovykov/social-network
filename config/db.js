const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async () => {
    try {

       await  mongoose.connect( db, {useNewUrlParser: true } ); 
       console.log('Mongo db connected')

    } catch(err) {
        console.error("Mongo db error : " + err.message);
        //Exit pocess with failure
        process.exit(1);
    }

}

module.exports = connectDB;