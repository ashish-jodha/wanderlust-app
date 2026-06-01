const { listingSchema, reviewSchema } = require('./schema.js');
const ExpressError = require('./utils/ExpressError.js');
const HotelInfo = require('./models/HotelInfo.js');
const Review = require('./models/Review.js');

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.method === 'GET' ? req.originalUrl : req.get('Referer');
        req.flash('error', 'You must be signed in first!');
        return res.redirect('/login');
    }
    next();
};

module.exports.saveRedirectUrl = (req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};

module.exports.isOwner = async (req, res, next) => {
    const { id } = req.params;
    const listing = await HotelInfo.findById(id);
    
    if (!listing) {
        req.flash('error', 'The listing you requested does not exist.');
        return res.redirect('/listings');
    }
    
    if (!listing.owner.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to edit this listing.');
        return res.redirect(`/listings/${id}`);
    }
    next();
};

module.exports.isReviewAuthor = async (req, res, next) => {
    const { id, reviewId } = req.params;
    const review = await Review.findById(reviewId);
    
    if (!review) {
        req.flash('error', 'The review you requested does not exist.');
        return res.redirect(`/listings/${id}`);
    }
    
    if (!review.author.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to delete this review.');
        return res.redirect(`/listings/${id}`);
    }
    next();
};

module.exports.validateListing = (req, res, next) => {
    const { error } = listingSchema.validate(req.body);
    if (error) {
        const errMsg = error.details.map(el => el.message).join(',');
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
};

module.exports.validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const errMsg = error.details.map(el => el.message).join(',');
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
};