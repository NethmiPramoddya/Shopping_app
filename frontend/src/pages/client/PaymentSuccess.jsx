import { useEffect, useState, useCallback, useRef } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { formatLkrPrice } from '../../utils/currency';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function PaymentSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const { paymentIntent, orderData } = location.state || {};
  const [orderCreated, setOrderCreated] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  
  // To ensure single execution even in React StrictMode
  const hasInitialized = useRef(false);

  const createOrderInDatabase = useCallback(async () => {
    // To prevent multiple executions in StrictMode
    if (hasInitialized.current) {
      console.log("Order creation already executed, skipping...");
      return;
    }

    const token = localStorage.getItem('token');
    console.log("Token from localStorage:", token ? `Present (length: ${token.length})` : "Missing");
    
    if (!token) {
      toast.error("Please login to complete order");
      navigate('/login');
      return;
    }

    // Check if order already created for this payment intent
    const existingOrderKey = `order_created_${paymentIntent.id}`;
    if (localStorage.getItem(existingOrderKey)) {
      console.log("Order already created for this payment intent");
      setOrderCreated(true);
      toast.success("Order already created!");
      return;
    }

    // Set ref to prevent concurrent executions
    hasInitialized.current = true;

    try {
      console.log("Creating order after successful payment...");
      console.log("Payment Intent:", paymentIntent?.id);
      console.log("Full Order Data:", JSON.stringify(orderData, null, 2));

      // Validate required data
      if (!orderData || !orderData.items || !orderData.customerInfo) {
        throw new Error("Missing order data or customer info");
      }

      // Log each item to check structure
      console.log("Items in order:");
      orderData.items.forEach((item, index) => {
        console.log(`Item ${index}:`, JSON.stringify(item, null, 2));
      });

      const order = {
        address: orderData.customerInfo.address,
        phone: orderData.customerInfo.phone,
        items: orderData.items.map(item => {
          // Handle different possible property names
          const productId = item.productId || item.id || item.product_id;
          const qty = item.quantity || item.qty || 1;
          
          if (!productId) {
            console.error("Missing productId in item:", item);
            throw new Error(`Missing productId in item: ${JSON.stringify(item)}`);
          }
          
          return {
            productId: productId,
            qty: qty
          };
        })
      };

      console.log("Final order object being sent to backend:", JSON.stringify(order, null, 2));

      const response = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/orders", 
        order, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      console.log("Order created successfully:", response.data);
      setOrderCreated(true);
      setOrderDetails(response.data.result);
      
      // Mark this payment intent as having created an order
      localStorage.setItem(existingOrderKey, 'true');
      
      toast.success("Order created successfully!");
      
    } catch (error) {
      console.error("Error creating order:", error);
      toast.error("Failed to create order. Please contact support.");
      // Reset ref on error so user can retry if needed
      hasInitialized.current = false;
    }
  }, [orderData, paymentIntent, navigate]);

  useEffect(() => {
    // Create order in database AFTER successful payment
    if (paymentIntent && orderData && !orderCreated) {
      console.log("useEffect triggered - attempting to create order");
      console.log("hasInitialized.current:", hasInitialized.current);
      createOrderInDatabase();
    } else {
      console.log("useEffect conditions not met:", {
        hasPaymentIntent: !!paymentIntent,
        hasOrderData: !!orderData,
        orderCreated: orderCreated,
        hasInitialized: hasInitialized.current
      });
    }
  }, [paymentIntent, orderData, orderCreated, createOrderInDatabase]);

  // Rest of your component remains the same...
  if (!paymentIntent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">No payment information found</p>
          <Link to="/" className="text-rose-600 hover:text-rose-700 font-semibold">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50 flex items-center justify-center py-12 px-6">
      <div className="max-w-2xl mx-auto text-center">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/50">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>

          <h1 className="font-serif text-3xl font-bold text-gray-800 mb-4">
            Payment Successful!
          </h1>
          <p className="text-gray-600 mb-6">
            Thank you for your order. Your payment has been processed successfully.
          </p>

          <div className="bg-gray-50 rounded-xl p-6 mb-6 text-left">
            <h3 className="font-semibold text-gray-800 mb-4">Payment Details</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Payment ID:</span>
                <span className="font-mono">{paymentIntent.id}</span>
              </div>
              <div className="flex justify-between">
                <span>Amount:</span>
                <span className="font-semibold">{formatLkrPrice(paymentIntent.amount / 100)}</span>
              </div>
              <div className="flex justify-between">
                <span>Status:</span>
                <span className="text-green-600 font-semibold capitalize">{paymentIntent.status}</span>
              </div>
              <div className="flex justify-between">
                <span>Date:</span>
                <span>{new Date(paymentIntent.created * 1000).toLocaleString()}</span>
              </div>
            </div>
          </div>

          {orderData && (
            <div className="bg-gray-50 rounded-xl p-6 mb-6 text-left">
              <h3 className="font-semibold text-gray-800 mb-4">Order Summary</h3>
              <div className="space-y-2">
                {orderData.items.map((item, index) => (
                  <div key={index} className="flex justify-between items-center py-1">
                    <span className="text-gray-600">{item.name} x {item.quantity}</span>
                    <span className="font-semibold">{formatLkrPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Order Creation Status */}
          <div className="bg-blue-50 rounded-xl p-4 mb-6">
            <div className="flex items-center justify-center gap-3">
              {orderCreated ? (
                <div className="flex items-center gap-2 text-green-700">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-semibold">Order Created Successfully!</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-blue-700">
                  <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                  <span className="font-semibold">Creating your order...</span>
                </div>
              )}
            </div>
            {orderDetails && (
              <p className="text-sm text-gray-600 mt-2 text-center">
                Order ID: <span className="font-mono font-semibold">{orderDetails.orderId}</span>
              </p>
            )}
          </div>

          <div className="space-y-3">
            <Link
              to="/products"
              className="block w-full bg-gradient-to-r from-rose-500 to-pink-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-rose-600 hover:to-pink-700 transition-all duration-300"
            >
              Continue Shopping
            </Link>
            <Link
              to="/orders"
              className="block w-full bg-gray-100 text-gray-700 font-semibold py-3 px-6 rounded-xl hover:bg-gray-200 transition-all duration-300"
            >
              View My Orders
            </Link>
          </div>

          <p className="text-sm text-gray-500 mt-6">
            A confirmation email has been sent to your registered email address.
          </p>
        </div>
      </div>
    </div>
  );
}