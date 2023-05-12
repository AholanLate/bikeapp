const express = require('express');
const router = express.Router();
const Trip = require('../models/tripsModel');

// Fetch all trips
router.get("/trips", async (req, res) => {
  try {
    const trips = await Trip.find();
    res.send(trips)
  } catch(err) {
    return res.status(500).json({ message: err.message });
  }
})

module.exports = router;