const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require('./Review');

const hotelSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  image: {
    type: String,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  country: {
    type: String,
    required: true,
    trim: true
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Review'
    }
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

hotelSchema.post('findOneAndDelete', async function(hotel) {
  if (hotel && hotel.reviews.length) {
    await Review.deleteMany({
      _id: { $in: hotel.reviews }
    });
  }
});

const HotelInfo = mongoose.model('HotelInfo', hotelSchema);

module.exports = HotelInfo;