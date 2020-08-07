const mongoose = require("mongoose");

const clinicalSchema = mongoose.Schema({
  name: String,
  address: {
    num: Number,
    name: String,
    cp: Number,
    city: String,
  },
});

const Clinical = mongoose.model("clinicals", clinicalSchema);

//** CLINICAL **//

const getAll = (_req, res) => {
  Clinical.find((err, results) => {
    if (err) return res.send(err);
    try {
      res.json(results);
    } catch (e) {
      console.log("errror getting all clinical");
      console.log(e);
    }
  });
};

module.exports = { getAll };
