import expressAsyncHandler from 'express-async-handler';
import reviewModel from '../../model/reviewModel.js';

const getBestReviews = expressAsyncHandler(async (req, res) => {
    const reviews = await reviewModel.aggregate([
        { $match: { rating: 5 } },
        { $sample: { size: 30 } } 
    ]);

    res.status(200).json(reviews);
});

export default getBestReviews;
