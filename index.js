const bodyParser = require('body-parser');
const express = require('express');
const tripsRoute = require('./routes/tripsRoute');
const stationsRoute = require('./routes/stationsRoute');

const app = express();
app.use(bodyParser.json());
// Use the tripsRoute router for all trips-related routes
app.use('/trips', tripsRoute);

// Use the stationsRoute router for all stations-related routes
app.use('/stations', stationsRoute);

//MongoDB connection
const mongoose = require('mongoose');
const mongoURL = 'mongodb+srv://bikeappuser:bikeapppw@bikeapp.cuw2ogy.mongodb.net/bikeapp?retryWrites=true&w=majority';

mongoose.connect(mongoURL, { useNewUrlParser: true , useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error'));

const port = 4000;

app.get("/", (req, res) => {
    res.send("homepage");
  })

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});