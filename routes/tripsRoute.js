const express = require('express');
const router = express.Router();
const Trip = require('../models/tripsModel');
const cors = require('cors');

// Enable CORS
router.use(cors());

// Fetch all trips with pagination
router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const startIndex = (page - 1) * limit;
    
    const trips = await Trip.find().skip(startIndex).limit(limit);
    const count = await Trip.countDocuments();
    
    const result = {
      currentPage: page,
      totalPages: Math.ceil(count / limit),
      totalItems: count,
      trips: trips
    };
    
    res.send(result);
  } catch(err) {
    return res.status(500).json({ message: err.message });
  }
})

// Get trip statistics for a particular station
router.get("/:id", async (req, res) => {
  try {
    const station_id = parseInt(req.params.id);
    
    // Find the number of trips that started at the station
    const startingTrips = await Trip.countDocuments({ departure_station_id: station_id });
    
    // Find the number of trips that ended at the station
    const endingTrips = await Trip.countDocuments({ return_station_id: station_id });
    
    // Calculate the average distance of trips that started at the station
    const startingTripDistances = await Trip.find({ departure_station_id: station_id }, { distance: 1 });
    const startingTripDistanceSum = startingTripDistances.reduce((acc, trip) => acc + trip.distance, 0);
    const avgStartingTripDistance = Math.round(startingTripDistanceSum / startingTrips);

    // Avg distance when being return station
    const returnTripDistances = await Trip.find({ departure_station_id: station_id }, { distance: 1 });
    const returnTripDistanceSum = returnTripDistances.reduce((acc, trip) => acc + trip.distance, 0);
    const avgReturnTripDistance = Math.round(returnTripDistanceSum / endingTrips);    

    res.send({ 
      startingTrips,
      endingTrips,
      avgStartingTripDistance,   
      avgReturnTripDistance 
    });

  } catch(err) {
    return res.status(500).json({ message: err.message });
  }
});

// Find all trips with a particular departure station name
// Find all trips with a particular departure station name
router.get("/departure/:name", async (req, res) => {
  try {
    const departureStationName = req.params.name;
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const startIndex = (page - 1) * limit;
    
    const trips = await Trip.find({ departure_station_name: departureStationName }).skip(startIndex).limit(limit);
    const count = await Trip.countDocuments({ departure_station_name: departureStationName });
    
    const result = {
      currentPage: page,
      totalPages: Math.ceil(count / limit),
      totalItems: count,
      trips: trips
    };
    
    res.send(result);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});


// Find all trips with a particular return station name
router.get("/return/:name", async (req, res) => {
  try {
    const returnStationName = req.params.name;
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const startIndex = (page - 1) * limit;
    const trips = await Trip.find({ return_station_name: returnStationName }).skip(startIndex).limit(limit);
    const count = await Trip.countDocuments({ return_station_name: returnStationName });
    const result = {
      currentPage: page,
      totalPages: Math.ceil(count / limit),
      totalItems: count,
      trips: trips
    };
    res.send(result);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});



module.exports = router;