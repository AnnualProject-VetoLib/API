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

const healthBookSchema = mongoose.Schema({
    num: Number,
    name: String,
    date_of_birth: String,
    sexe: String,
    isSterilized: Boolean,
    type: String,
    breed: String,
    userId: mongoose.Schema.Types.ObjectId,
}); 

const healthBook = mongoose.model('health_books', healthBookSchema);

//** HEALTH BOOK **//

const getAll = (_req, res) => {
    healthBook.find((err, results) => {
        if (err) return res.send(err); 
        try {
            res.json(results);
        } catch (e) {
            console.log("errror getting all health book")
            console.log(e)
        }
    });
};

const getById = (req, res) => {
    healthBook.findById(req.params.id, (err, results) => {
        if (err) return console.error(err)
        try {
            res.json(results);
        } catch (e) {
            console.log("errror getting this health book")
            console.log(e)
        } 
    })
};

const add = (req, res) => {
    healthBook.create(req.body, (err, results) => {
        if (err) return console.error(err)
        try {
            res.json(results);
        } catch (e) {
            console.log("errror creating health book")
            console.log(e)
        } 
    })
};

const remove = (req, res) => {
    healthBook.deleteOne({_id: req.params.id}, (err, results) => {
        if (err) return console.error(err)
        try {
            res.json(results);
        } catch (e) {
            console.log("errror removing this health book")
            console.log(e)
        } 
    })
};

const update = (req, res) => {
    healthBook.updateOne({_id: req.params.id}, req.body, (err, results) => {
        if (err) return console.error(err)
        try {
            res.json(results);
        } catch (e) {
            console.log("errror creating health book")
            console.log(e)
        } 
    })
};

module.exports = { getAll, getById, add, remove, update };