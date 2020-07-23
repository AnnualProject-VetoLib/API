
const mongoose = require('mongoose');
const { DATA_BASE_URL } = require('./const');

const config = {
    autoIndex: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
  };

mongoose.connect(DATA_BASE_URL, config);

const db = mongoose.connection; 
db.on('error', console.error.bind(console, 'Erreur lors de la connexion')); 
db.once('open', function (){
    console.log("Connexion db : OK"); 
}); 

const clinicalSchema = mongoose.Schema({
    name: String,
    address: {
        num: Number,
        name: String,
        cp: Number,
        city: String
    }
}); 

const Clinical = mongoose.model('clinicals', clinicalSchema);

//** CLINICAL **//

const getAll = (_req, res) => {
    Clinical.find((err, results) => {
        if (err) return res.send(err); 
        try {
            res.json(results);
        } catch (e) {
            console.log("errror getting all clinical")
            console.log(e)
        }
    });
};

module.exports = { getAll };