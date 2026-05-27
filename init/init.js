const mongoose = require('mongoose');
const HotelInfo = require('../models/HotelInfo.js'); 
const initData = require('./data.js');

const MONGO_URL = 'mongodb://127.0.0.1:27017/wanderlust';
mongoose.connect(MONGO_URL)
  .then(() => console.log("Connected to MongoDB for Initialization"))
  .catch((err) => console.log("MongoDB Connection Error:", err));

const initDB = async () => {
  try {
    await HotelInfo.deleteMany({});
    console.log("Existing database cleared.");

    await HotelInfo.insertMany(initData.data);
    console.log("New data successfully initialized!");

  } catch (err) {
    console.log("Error initializing data:", err);
  }
};

initDB().then(() => {
  mongoose.connection.close();
  console.log("Database connection closed.");
});