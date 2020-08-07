require("./db");
const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  ordinalNumber: Number,
  firstname: String,
  lastname: String,
  email: String,
  password: String,
  isVeto: Boolean,
  validated: String,
  clinicalId: mongoose.Schema.Types.ObjectId,
});

const User = mongoose.model("users", userSchema);

//** USER **//

const getAll = (_req, res) => {
  User.find((err, results) => {
    if (err) return res.send(err);
    try {
      res.json(results);
    } catch (e) {
      console.log("errror getting all user");
      console.log(e);
    }
  });
};

const getById = (req, res) => {
  User.findById(req.params.id, (err, results) => {
    if (err) return console.error(err);
    try {
      res.json(results);
    } catch (e) {
      console.log("errror getting this user");
      console.log(e);
    }
  });
};

const getVeto = (_req, res) => {
  User.findById({ isVeto: true }, (err, results) => {
    if (err) return console.error(err);
    try {
      res.json(results);
    } catch (e) {
      console.log("errror getting this user");
      console.log(e);
    }
  });
};

const getCustomer = (_req, res) => {
  User.findById({ isVeto: false }, (err, results) => {
    if (err) return console.error(err);
    try {
      res.json(results);
    } catch (e) {
      console.log("errror getting this user");
      console.log(e);
    }
  });
};

const add = (req, res) => {
  User.create(req.body, (err, results) => {
    if (err) return console.error(err);
    try {
      res.json(results);
    } catch (e) {
      console.log("errror creating user");
      console.log(e);
    }
  });
};

const remove = (req, res) => {
  User.deleteOne({ _id: req.params.id }, (err, results) => {
    if (err) return console.error(err);
    try {
      res.json(results);
    } catch (e) {
      console.log("errror removing this user");
      console.log(e);
    }
  });
};

const update = (req, res) => {
  User.updateOne({ _id: req.params.id }, req.body, (err, results) => {
    if (err) return console.error(err);
    try {
      res.json(results);
    } catch (e) {
      console.log("errror creating user");
      console.log(e);
    }
  });
};

const login = (req, res) => {
  User.findById(req.body, (err, results) => {
    if (err) return console.error(err);
    try {
      res.json(results);
    } catch (e) {
      console.log("errror getting this user");
      console.log(e);
    }
  });
};

module.exports = {
  getAll,
  getById,
  add,
  remove,
  update,
  getVeto,
  getCustomer,
  login,
};
