const HotelInfo = require('../models/HotelInfo');
const Review = require('../models/Review');

module.exports.createReview = async (req, res) => {
    const { id } = req.params;
    const { review } = req.body;
    
    const hotel = await HotelInfo.findById(id);
    const newReview = new Review(review);
    
    newReview.author = req.user._id;
    
    hotel.reviews.push(newReview);
    
    await newReview.save();
    await hotel.save();

    req.flash('success', 'New review created!');
    res.redirect(`/listings/${id}`);
};

module.exports.destroyReview = async (req, res) => {
    const { id, reviewId } = req.params;

    await HotelInfo.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);

    req.flash('success', 'Review deleted successfully!');
    res.redirect(`/listings/${id}`);
};