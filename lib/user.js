
const mongoose = require('mongoose');
const { DATA_BASE_URL } = require('./const');

const userSchema = mongoose.Schema({
    email: String,
    password: String,
    tel: String,
    lastName: String,
    firstName: String
}); 

const User = mongoose.model('users', userSchema);
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

//** USER **//

function getAll(_req, res) {
    User.find(function(err, piscines){
        if (err){
            res.send(err); 
        }
        res.json(piscines); 
        
    });
};
/*function getAll(_req, res) {
    MongoClient.connect(DATA_BASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then((client) => {
        const dbo = client.db(DATA_BASE_NAME);
        const collection = dbo.collection(COLLECTION_NAME);
        const query = {};

        collection.find(query).toArray((err, result) => {
            if (err || result.length <= 0) res.end(null);
            console.log(result);
            res.end(JSON.stringify(result));
            client.close();
        });
    }).catch((err) => {
        console.error(err)
    })
};
/*
function getOne(req, res) {
    MongoClient.connect(DATA_BASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then((client) => {
        const dbo = client.db(DATA_BASE_NAME);
        const collection = dbo.collection(COLLECTION_NAME);
        const query = { _id : new MongoObjectId(req.params.id) };

        collection.find(query).toArray((err, result) => {
            if (err || result.length <= 0) res.end(null);
            console.log(result);
            res.end(JSON.stringify(result));
            client.close();
        });
    }).catch((err) => {
        console.error(err)
    })
};

function addOne(req, res) {
    MongoClient.connect(DATA_BASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then((client) => {
        const dbo = client.db(DATA_BASE_NAME);
        const collection = dbo.collection(COLLECTION_NAME);
        let query =  req.body;
        profilRoot = query;

        //ENGAGEMENT
        if(profilRoot.isEngaged) {
            let nbEngagementMonth = 0;
            switch(profilRoot.subscription) {
                case "simple": nbEngagementMonth = 12; break;
                case "resident": nbEngagementMonth = 8; break;
            }
            let nowDate = new Date();
            let day = nowDate.getDate();
            let newDate = new Date(nowDate.setMonth(nowDate.getMonth() + nbEngagementMonth));
            let month = newDate.getMonth() + 1;
            let year = newDate.getFullYear();

            profilRoot.engagementDate = day + "/" + month + "/" + year;
            query = profilRoot;
        }

        collection.insertOne(query).then((result) => {
            console.log(result);
            res.end(JSON.stringify(result));
            client.close();
        }).catch((err) => {
            console.error(err)
        })
    }).catch((err) => {
        console.error(err)
    })
};

function updateOne(req, res) {
    MongoClient.connect(DATA_BASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then((client) => {
        const dbo = client.db(DATA_BASE_NAME);
        const collection = dbo.collection(COLLECTION_NAME);
        const query = { _id : new MongoObjectId(req.params.id) };
        const newValues = { $set: Object.freeze(req.body)};

        collection.updateOne(query, newValues).then((result) => {
            console.log(result);
            res.end("User updated!");
            client.close();
        }).catch((err) => {
            console.error(err)
        })
    }).catch((err) => {
        console.error(err)
    })
};

function deleteOne(req, res) {
    MongoClient.connect(DATA_BASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then((client) => {
        const dbo = client.db(DATA_BASE_NAME);
        const collection = dbo.collection(COLLECTION_NAME);
        const query = { _id : new MongoObjectId(req.params.id) };

        collection.deleteOne(query).then((result) => {
            console.log(result);
            res.end("User deleted!");
            client.close();
        }).catch((err) => {
            console.error(err)
        })
    }).catch((err) => {
        console.error(err)
    })
};

function login(req, res) {
    MongoClient.connect(DATA_BASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then((client) => {
        const dbo = client.db(DATA_BASE_NAME);
        const collection = dbo.collection(COLLECTION_NAME);
        let query = req.body;
        query = JSON.parse('{"connectDetail":' + JSON.stringify(query) + '}');
        collection.find(query).toArray((err, result) => {
            console.log(result);
            if (result.length <= 0)
                res.end(null);
            else
                res.end(JSON.stringify(result));
            client.close();
        })
    }).catch((err) => {
        console.error(err)
    })
};*/

module.exports = { getAll/*, getOne, addOne, updateOne, deleteOne, login */};