const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User' 
    },
    rating: {
        type: Number,
        required: true,
        min: 1, 
        max: 5  
    },
    comment: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now 
    }
});

module.exports = mongoose.model('Review', reviewSchema);