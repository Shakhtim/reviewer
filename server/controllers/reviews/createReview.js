import expressAsyncHandler from 'express-async-handler';
import Review from '../../model/reviewModel.js';
import { v4 as uuidv4 } from 'uuid';

const createReview = expressAsyncHandler(async (req, res) => {
    const data = req.body;

    const uuid = uuidv4();
    const numericId = parseInt(uuid.replace(/-/g, ''), 16);

    const review = await Review.create({ ...data, id: numericId });

    res.status(201).send(review);
});

export default createReview;
