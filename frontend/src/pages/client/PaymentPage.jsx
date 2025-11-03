import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import StripeProvider from '../../components/StripeProvider';
import PaymentForm from '../../components/PaymentForm';
import toast from 'react-hot-toast';
import { formatLkrPrice } from '../../utils/currency';

export default function PaymentPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    
    const data = location.state?.orderData || JSON.parse(localStorage.getItem('pendingOrder') || 'null');
    
    if (!data) {
      toast.error('No order data found');
      navigate('/cart');
      return;
    }
    
    setOrderData(data);
  }, [location, navigate]);

  const handlePaymentSuccess = (paymentIntent) => {
    console.log('Payment successful:', paymentIntent);
    
    // Clear pending order
    localStorage.removeItem('pendingOrder');
    
    // Navigate to success page with payment details
    navigate('/payment-success', {
      state: {
        paymentIntent,
        orderData
      }
    });
  };

  if (!orderData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-rose-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading payment form...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50 py-12 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-serif text-4xl font-bold text-gray-800 mb-2">
            Complete Your Order
          </h1>
          <p className="text-gray-600">
            Secure payment powered by <span className="font-semibold text-blue-600">Stripe</span>
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div className="space-y-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Order Summary</h2>
              
              <div className="space-y-3">
                {orderData.items.map((item, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100">
                    <div>
                      <p className="font-medium text-gray-800">{item.name}</p>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-semibold text-gray-800">
                      {formatLkrPrice(item.price * item.quantity)}
                    </p>
                  </div>
                ))}
                
                <div className="pt-3 border-t-2 border-gray-200">
                  <div className="flex justify-between items-center text-xl font-bold text-gray-800">
                    <span>Total:</span>
                    <span className="text-rose-600">{formatLkrPrice(orderData.total)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Customer Info */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Billing Information</h3>
              <div className="space-y-2 text-gray-600">
                <p><span className="font-medium">Name:</span> {orderData.customerInfo.name}</p>
                <p><span className="font-medium">Email:</span> {orderData.customerInfo.email}</p>
                <p><span className="font-medium">Phone:</span> {orderData.customerInfo.phone}</p>
                <p><span className="font-medium">Address:</span> {orderData.customerInfo.address}</p>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <div>
            <StripeProvider>
              <PaymentForm
                totalAmount={orderData.total}
                orderItems={orderData.items}
                customerInfo={orderData.customerInfo}
                onSuccess={handlePaymentSuccess}
              />
            </StripeProvider>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 text-gray-500 text-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span>Your payment information is secure and encrypted</span>
          </div>
        </div>
      </div>
    </div>
  );
}