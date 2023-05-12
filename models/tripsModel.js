var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var TripsSchema = new Schema(
  {
    departure_time: { type: String, required: true },
    return_time: { type: String, required: true },
    departure_station_id: {type: Number, required: true },
    departure_station_name: { type: String, required: true },
    return_station_id: {type: Number, required: true },
    return_station_name: { type: String, required: true },
    distance: { type: Number, required: true },
    duration: { type: Number, required: true }
  }
);

//Export model
module.exports = mongoose.model('Trips', TripsSchema);