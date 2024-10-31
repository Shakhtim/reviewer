import mongoose, { Schema } from 'mongoose';

// установка схемы
const reviewScheme = new Schema(
    {
        id: Number,
        autosalon: String,
        rating: Number,
        author: String,
        title: String,
        text: String,
        date: { type: Date, default: Date.now }
    },
    { versionKey: false }
);

const Review = mongoose.model('Review', reviewScheme);

export default Review;
