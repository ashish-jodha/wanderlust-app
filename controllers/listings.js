const HotelInfo = require('../models/HotelInfo');

module.exports.index = async (req, res) => {
    const allHotels = await HotelInfo.find({});
    res.render('listings/home', { allHotels });
};

module.exports.renderNewForm = (req, res) => {
    res.render('listings/new');
};

module.exports.showListing = async (req, res) => {
    const { id } = req.params;
    
    const Hotel = await HotelInfo.findById(id)
        .populate({
            path: 'reviews',
            populate: {
                path: 'author'
            }
        })
        .populate('owner');
        
    if (!Hotel) {
        req.flash('error', 'Cannot find that listing!');
        return res.redirect('/listings');
    }
    
    res.render("listings/show", { Hotel });
};

module.exports.createListing = async (req, res) => {
    const listingCount = await HotelInfo.countDocuments({ owner: req.user._id });
    
    if (listingCount >= 5) {
        req.flash('error', 'Free tier limit reached: You can only host a maximum of 5 properties.');
        return res.redirect('/listings');
    }
    
    const { listing } = req.body;
    
    const newHotel = new HotelInfo(listing);
    newHotel.owner = req.user._id; 
    
    if (req.file) newHotel.image = req.file.path;
    
    await newHotel.save();
    
    req.flash('success', 'Successfully created a new listing!');
    res.redirect(`/listings`);
};

module.exports.renderEditForm = async (req, res) => {
    const { id } = req.params;
    const Hotel = await HotelInfo.findById(id);
    
    if (!Hotel) {
        req.flash('error', 'Cannot find that listing!');
        return res.redirect('/listings');
    }
    
    res.render('listings/edit', { Hotel });
};

module.exports.updateListing = async (req, res) => {
    const { id } = req.params;
    const { listing } = req.body;
    
    const updatedHotel = await HotelInfo.findByIdAndUpdate(id, { ...listing });
    
    if (req.file) updatedHotel.image = req.file.path;

    await updatedHotel.save();
    
    req.flash('success', 'Successfully updated listing!');
    res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req, res) => {
    const { id } = req.params;
    
    await HotelInfo.findByIdAndDelete(id);
    
    req.flash('success', 'Successfully deleted listing!');
    res.redirect('/listings');
};