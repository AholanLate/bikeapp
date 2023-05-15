const express = require('express');
const router = express.Router();
const Trip = require('../models/tripsModel');
const cors = require('cors');

// Enable CORS
router.use(cors());

// Fetch all trips with pagination
router.get("/trips", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 15;
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

module.exports = router;