const express = require('express');
const router = express.Router();
const multer = require('multer');
const { storage } = require('../cloudConfig');
const listingController = require('../controllers/listings');
const { isLoggedIn, isOwner, validateListing } = require('../middleware');

const upload = multer({ storage });

router.route('/')
    .get(listingController.index)
    .post(isLoggedIn, upload.single('image'), validateListing, listingController.createListing);

router.get('/new', isLoggedIn, listingController.renderNewForm);

router.route('/:id')
    .get(listingController.showListing)
    .put(isLoggedIn, isOwner, upload.single('image'), validateListing, listingController.updateListing)
    .delete(isLoggedIn, isOwner, listingController.destroyListing);

router.get('/:id/edit', isLoggedIn, isOwner, listingController.renderEditForm);

module.exports = router;