import express from 'express';
import { createPaymentIntent, confirmPayment, webhookHandler } from '../Controller/stripPaymetController.js';

const paymentRouter = express.Router();

// Create payment intent
paymentRouter.post('/create-payment-intent', createPaymentIntent);

// Confirm payment (optional - for additional verification)
paymentRouter.post('/confirm-payment', confirmPayment);

// Stripe webhook endpoint
paymentRouter.post('/webhook', express.raw({type: 'application/json'}), webhookHandler);

export default paymentRouter;