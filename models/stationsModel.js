var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var StationsSchema = new Schema(
  {
    ID: { type: Number, required: true },
    Nimi: { type: String, required: true },
    Osoite: { type: String, required: true },
    Kaupunki: { type: String, required: true },
    Operaattor: { type: String, required: true },
    Kapasiteet: { type: Number, required: true },
    x: { type: Number, required: true },
    y: { type: Number, required: true }
  }
);

//Export model
module.exports = mongoose.model('Stations', StationsSchema);