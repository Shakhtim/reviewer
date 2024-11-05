import express from 'express';
import createReview from '../controllers/reviews/createReview.js';
import getReviews from '../controllers/reviews/getReviews.js';
import getReviewsBySalon from '../controllers/reviews/getReviewsBySalon.js';
import getBestReviews from '../controllers/reviews/getBestReviews.js';

// const fetchOrder = require('../controllers/orders/fetchOrder');
// const fetchOrders = require('../controllers/orders/fetchOrders');
// const editOrder = require('../controllers/orders/editOrder');
// const deleteOrder = require('../controllers/orders/deleteOrder');

const router = express.Router();

router.route('/').post(createReview);
// router.route('/by-id').post(fetchOrder);
router.route('/get').get(getReviews);
router.route('/getBest').get(getBestReviews);
router.route('/getBySalon/:nameSalon').get(getReviewsBySalon);
// router.route('/edit').post(editOrder);
// router.route('/delete').post(deleteOrder);

export default router;
