import { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import axios from 'axios';
import toast from 'react-hot-toast';
import { formatLkrPrice } from '../utils/currency';

const cardStyle = {
  style: {
    base: {
      color: '#424770',
      fontFamily: 'Arial, sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '16px',
      '::placeholder': {
        color: '#aab7c4',
      },
    },
    invalid: {
      color: '#9e2146',
      iconColor: '#9e2146',
    },
  },
};

export default function PaymentForm({ totalAmount, orderItems, customerInfo, onSuccess }) {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);
    setPaymentError(null);

    try {
      // Create payment intent on your backend
      const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/payments/create-payment-intent`, {
        amount: totalAmount,
        currency: 'lkr',
        orderItems,
        customerInfo
      });

      const { clientSecret } = data;

      // Confirm payment with Stripe
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: customerInfo.name,
            email: customerInfo.email,
          },
        },
      });

      if (result.error) {
        setPaymentError(result.error.message);
        toast.error(result.error.message);
      } else {
        if (result.paymentIntent.status === 'succeeded') {
          toast.success('Payment successful!');
          onSuccess(result.paymentIntent);
        }
      }
    } catch (error) {
      console.error('Payment error:', error);
      setPaymentError('Payment failed. Please try again.');
      toast.error('Payment failed. Please try again.');
    }

    setProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Payment Information</h3>
        
        <div className="space-y-4">
          {/* Card Element */}
          <div className="p-4 border-2 border-gray-200 rounded-xl focus-within:border-rose-400 transition-colors duration-300">
            <CardElement options={cardStyle} />
          </div>

          {/* Payment Error */}
          {paymentError && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{paymentError}</p>
            </div>
          )}

          {/* Order Summary */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex justify-between items-center text-lg font-semibold">
              <span>Total Amount:</span>
              <span className="text-rose-600">{formatLkrPrice(totalAmount)}</span>
            </div>
          </div>

          {/* Pay Button */}
          <button
            type="submit"
            disabled={!stripe || processing}
            className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-300 ${
              processing || !stripe
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 hover:shadow-lg cursor-pointer'
            }`}
          >
            {processing ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Processing...
              </div>
            ) : (
              `Pay ${formatLkrPrice(totalAmount)}`
            )}
          </button>
        </div>
      </div>
    </form>
  );
}