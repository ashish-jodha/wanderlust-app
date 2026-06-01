const express = require('express');
const router = express.Router({ mergeParams: true }); 
const reviewController = require('../controllers/reviews');
const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware');

router.post('/', isLoggedIn, validateReview, reviewController.createReview);

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, reviewController.destroyReview);

module.exports = router;