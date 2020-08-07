const mongoose = require("mongoose");
const { DATA_BASE_URL } = require("./const");

const config = {
  autoIndex: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(DATA_BASE_URL, config);

const connect = mongoose.connection;

connect.on("error", console.error.bind(console, "Erreur lors de la connexion"));
connect.once("open", function () {
  console.log("Connexion db : OK");
});

module.exports = { connect };
