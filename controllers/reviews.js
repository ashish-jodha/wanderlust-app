const HotelInfo = require('../models/HotelInfo');
const Review = require('../models/Review');
const User = require('../models/User'); 

module.exports.createReview = async (req, res) => {
    const { id } = req.params;
    const { review } = req.body;
    
    const hotel = await HotelInfo.findById(id);
    const newReview = new Review(review);
    
    newReview.author = req.user._id;
    
    const adminUser = await User.findOne({ username: 'Ashish' });
    const isAdmin = adminUser && req.user._id.equals(adminUser._id);
    
    if (!isAdmin) {
        const sevenDaysFromNow = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
        newReview.expiresAt = sevenDaysFromNow;
    }
    
    hotel.reviews.push(newReview);
    
    await newReview.save();
    await hotel.save();

    if (!isAdmin) {
        req.flash('success', 'Review posted! (Test reviews expire in 7 days)');
    } else {
        req.flash('success', 'New permanent review created!');
    }
    
    res.redirect(`/listings/${id}`);
};

module.exports.destroyReview = async (req, res) => {
    const { id, reviewId } = req.params;

    await HotelInfo.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);

    req.flash('success', 'Review deleted successfully!');
    res.redirect(`/listings/${id}`);
};