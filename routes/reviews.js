const express = require('express');
const router = express.Router({ mergeParams: true });
const HotelInfo = require('../models/HotelInfo');
const Review = require('../models/Review');

router.post('/', async (req, res) => {
    const { id } = req.params;
    const { review } = req.body;
    
    const hotel = await HotelInfo.findById(id);
    const hotelReview = await Review.create({ ...review });
    
    hotel.reviews.push(hotelReview);
    await hotel.save();

    res.redirect(`/listings/${id}`);
});

router.delete('/:reviewId', async (req, res) => {
    const { id, reviewId } = req.params;

    await HotelInfo.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);

    res.redirect(`/listings/${id}`);
});

module.exports = router;