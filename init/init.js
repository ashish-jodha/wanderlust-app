const mongoose = require('mongoose');
const HotelInfo = require('../models/HotelInfo.js');
const User = require('../models/User.js');
const initData = require('./data.js');

const MONGO_URL = 'mongodb://127.0.0.1:27017/wanderlust';
mongoose.connect(MONGO_URL)
  .then(() => console.log("Connected to MongoDB for Initialization"))
  .catch((err) => console.log("MongoDB Connection Error:", err));

const initDB = async () => {
  try {
    await HotelInfo.deleteMany({});
    console.log("Existing database cleared.");

    let seedUser = await User.findOne({ username: 'Ashish' });

    if (!seedUser) {
      console.log("Owner 'Ashish' not found. Creating seed user...");

      const newUser = new User({ email: 'ashish@wanderlust.com', username: 'Ashish' });
      seedUser = await User.register(newUser, 'password123');

      console.log("Seed user 'Ashish' created.");
    } 
    else 
    {
      console.log("Seed user 'Ashish' found.");
    }

    const updatedData = initData.data.map((obj) => ({
      ...obj,
      owner: seedUser._id
    }));

    await HotelInfo.insertMany(updatedData);
    console.log("New data successfully initialized with owner Ashish!");

  } 
  catch (err) 
  {
    console.log("Error initializing data:", err);
  }
};

initDB().then(() => {
  mongoose.connection.close();
  console.log("Database connection closed.");
});