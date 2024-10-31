import express from 'express';
import createReview from '../controllers/reviews/createReview.js';

// const fetchOrder = require('../controllers/orders/fetchOrder');
// const fetchOrders = require('../controllers/orders/fetchOrders');
// const editOrder = require('../controllers/orders/editOrder');
// const deleteOrder = require('../controllers/orders/deleteOrder');

const router = express.Router();

router.route('/').post(createReview);
// router.route('/by-id').post(fetchOrder);
// router.route('/all').get(fetchOrders);
// router.route('/edit').post(editOrder);
// router.route('/delete').post(deleteOrder);

export default router;