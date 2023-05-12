const express = require('express');
const router = express.Router();
const Trip = require('../models/tripsModel');

// Fetch all trips
router.get("/trips", async (req, res) => {
  try {
    const trips = await Trip.findOne();
    res.send(trips)
  } catch(err) {
    return res.status(500).json({ message: err.message });
  }
})

// Add trip
router.post("/trips", async (req, res) => {
  const trip = new Trip({
    departure_time: req.body.departure_time,
    return_time: req.body.return_time,
    departure_station_id: req.body.departure_station_id,
    departure_station_name: req.body.departure_station_name,
    return_station_id: req.body.return_station_id,
    return_station_name: req.body.return_station_name,
    distance: req.body.distance,
    duration: req.body.duration
  });

  try {
    const newTrip = await trip.save();
    res.status(201).json({ newTrip });
  } catch(err) {
    return res.status(500).json({ message: err.message });
  }
})

module.exports = router;