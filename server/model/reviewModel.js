import mongoose, { Schema } from 'mongoose';

// установка схемы
const reviewScheme = new Schema(
    {
        id: Number,
        autosalon: String,
        rating: Number,
        name: String,
        text: String,
    },
    { versionKey: false }
);

const Review = mongoose.model('Review', reviewScheme);

export default Review;
