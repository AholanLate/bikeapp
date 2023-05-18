const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const StationsSchema = new Schema({
  ID: { type: Number, required: true },
  Nimi: { type: String, required: true },
  Osoite: { type: String, required: true },
  Kaupunki: { type: String, required: true },
  Operaattor: { type: String, required: true },
  Kapasiteet: { type: Number, required: true },
  x: { type: Number, required: true },
  y: { type: Number, required: true }
});

module.exports = mongoose.model('Station', StationsSchema);
