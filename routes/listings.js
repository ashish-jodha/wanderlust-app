const express = require('express');
const router = express.Router();
const HotelInfo = require('../models/HotelInfo');

router.get('/', async (req, res) => {
    const allHotels = await HotelInfo.find({});
    res.render('listings/home', { allHotels });
});

router.get('/new', (req, res) => {
    res.render('listings/new');
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const Hotel = await HotelInfo.findById(id).populate('reviews');
    res.render("listings/show", { Hotel });
});

router.post('/', async (req, res) => {
    const { listing } = req.body;
    await HotelInfo.create({ ...listing });
    res.redirect(`/listings`);
});

router.get('/:id/edit', async (req, res) => {
    const { id } = req.params;
    const Hotel = await HotelInfo.findById(id);
    res.render('listings/edit', { Hotel });
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { listing } = req.body;
    await HotelInfo.findByIdAndUpdate(id, { ...listing });
    res.redirect(`/listings/${id}`);
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    await HotelInfo.findByIdAndDelete(id);
    res.redirect('/listings');
});

module.exports = router;