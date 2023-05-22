const bodyParser = require('body-parser');
const express = require('express');
const dotenv = require('dotenv'); 

// Load environment variables from .env file
dotenv.config();

// require routes
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
const mongoURL = process.env.MONGODB_URI;
mongoose.connect(mongoURL, { useNewUrlParser: true , useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error'));

const port = process.env.PORT;

app.get("/", (res) => {
  res.send("homepage");
});

module.exports = app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
