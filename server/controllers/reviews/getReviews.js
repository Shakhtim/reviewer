import expressAsyncHandler from 'express-async-handler';
import reviewModel from '../../model/reviewModel.js';

const getReviews = expressAsyncHandler(async (req, res) => {
    const reviews = await reviewModel.find(); 
    res.status(200).json(reviews); 
});

export default getReviews;
