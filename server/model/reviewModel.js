import mongoose, { Schema } from 'mongoose';

// установка схемы
const reviewScheme = new Schema(
    {
        author: String,
        nameSalon: String,
        datePublished: { type: Date, default: Date.now },
        rating: Number,
        title: String,
        text: String,
        
    },
    { versionKey: false }
); 

const Review = mongoose.model('Review', reviewScheme);

export default Review;
