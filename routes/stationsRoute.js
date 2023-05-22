const express = require('express');
const router = express.Router();
const Station = require('../models/stationsModel');
const cors = require('cors');

// Enable CORS
router.use(cors());

// Fetch all stations with pagination
router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const startIndex = (page - 1) * limit;
    
    const stations = await Station.find().skip(startIndex).limit(limit);
    const count = await Station.countDocuments();
    
    const result = {
      currentPage: page,
      totalPages: Math.ceil(count / limit),
      totalItems: count,
      stations: stations
    };
    
    res.send(result);
  } catch(err) {
    return res.status(500).json({ message: err.message });
  }
});

// Fetch a station by id
router.get("/:id", async (req, res) => {
  try {
    const station = await Station.findOne({ ID: req.params.id });
    if (!station) {
      return res.status(404).json({ message: "Station not found" });
    }
    res.send(station);
  } catch(err) {
    return res.status(500).json({ message: err.message });
  }
});

// fetch a station by name
router.get("/byName/:name", async (req, res) => {
  try {
    const station = await Station.findOne({ Nimi: req.params.name });

    res.send(station);
    
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});



module.exports = router;
