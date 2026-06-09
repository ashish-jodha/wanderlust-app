if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const mongoose = require('mongoose');
const HotelInfo = require('../models/HotelInfo.js');
const User = require('../models/User.js');
const initData = require('./data.js');

const dbUrl = process.env.ATLASDB_URL;

mongoose.connect(dbUrl)
  .then(() => console.log("Connected to MongoDB Atlas for Initialization"))
  .catch((err) => console.log("MongoDB Connection Error:", err));

const initDB = async () => {
  try {
    await HotelInfo.deleteMany({});
    console.log("Existing database cleared.");

    let seedUser = await User.findOne({ username: 'Ashish' });

if (!seedUser) {
      console.log("Owner 'Ashish' not found. Creating seed user...");

      const newUser = new User({ email: 'ashish@wanderlust.com', username: 'Ashish' });
      seedUser = await User.register(newUser, process.env.ADMIN_PASSWORD);

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