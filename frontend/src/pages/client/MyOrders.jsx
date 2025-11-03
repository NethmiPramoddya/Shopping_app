import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Package, Calendar, MapPin, Phone, CreditCard, ChevronRight, Truck, Clock, CheckCircle, XCircle } from 'lucide-react';
import { formatLkrPrice } from '../../utils/currency';

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const limit = 6; // Orders per page

  const fetchOrders = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Please login to view orders');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/orders/${currentPage}/${limit}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setOrders(response.data.orders);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast.error('Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  }, [currentPage]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'shipped': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'delivered': return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'shipped': return <Truck className="w-4 h-4" />;
      case 'delivered': return <CheckCircle className="w-4 h-4" />;
      case 'cancelled': return <XCircle className="w-4 h-4" />;
      default: return <Package className="w-4 h-4" />;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-rose-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl font-bold text-gray-800 mb-4">My Orders</h1>
          <p className="text-gray-600">Track and manage your <span className="bg-gradient-to-r from-rose-400 to-pink-500 bg-clip-text text-transparent font-semibold">Glamore'</span> orders</p>
        </div>

        {orders.length === 0 ? (
          // Empty State
          <div className="text-center py-16">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg p-12 border border-white/50 max-w-2xl mx-auto">
              <Package className="w-24 h-24 text-gray-400 mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-gray-800 mb-4">No Orders Yet</h2>
              <p className="text-gray-600 mb-8">You haven't placed any orders yet. Start shopping to see your orders here!</p>
              <Link
                to="/products"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-semibold py-3 px-8 rounded-xl hover:from-rose-600 hover:to-pink-700 transition-all duration-300"
              >
                Start Shopping
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ) : (
          <>
            {/* Orders Grid */}
            <div className="grid gap-6 mb-8">
              {orders.map((order) => (
                <div key={order._id} className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 overflow-hidden">
                  <div className="p-6">
                    {/* Order Header */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                      <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-1">Order #{order.orderId}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>{formatDate(order.date)}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <CreditCard className="w-4 h-4" />
                            <span>{formatLkrPrice(order.total)}</span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 md:mt-0">
                        <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(order.status)}`}>
                          {getStatusIcon(order.status)}
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-800 mb-3">Items ({order.items.length})</h4>
                      <div className="grid gap-3">
                        {order.items.slice(0, 3).map((item, index) => (
                          <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-16 h-16 object-cover rounded-lg"
                            />
                            <div className="flex-1">
                              <h5 className="font-medium text-gray-800">{item.name}</h5>
                              <p className="text-sm text-gray-600">Qty: {item.qty} × {formatLkrPrice(item.price)}</p>
                            </div>
                            <div className="font-semibold text-gray-800">
                              {formatLkrPrice(item.qty * item.price)}
                            </div>
                          </div>
                        ))}
                        {order.items.length > 3 && (
                          <p className="text-sm text-gray-500 text-center py-2">
                            +{order.items.length - 3} more items
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Order Details */}
                    <div className="grid md:grid-cols-2 gap-4 mb-6">
                      <div>
                        <h5 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          Delivery Address
                        </h5>
                        <p className="text-gray-600 text-sm bg-gray-50 p-3 rounded-lg">{order.address}</p>
                      </div>
                      <div>
                        <h5 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                          <Phone className="w-4 h-4" />
                          Contact
                        </h5>
                        <p className="text-gray-600 text-sm bg-gray-50 p-3 rounded-lg">{order.phone}</p>
                      </div>
                    </div>

                    {/* Order Actions */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
                      <button
                        onClick={() => setSelectedOrder(selectedOrder === order._id ? null : order._id)}
                        className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-lg transition-colors duration-300"
                      >
                        {selectedOrder === order._id ? 'Hide Details' : 'View Details'}
                      </button>
                      {order.status.toLowerCase() === 'delivered' && (
                        <Link
                          to="/products"
                          className="flex-1 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-semibold py-2 px-4 rounded-lg text-center transition-all duration-300"
                        >
                          Order Again
                        </Link>
                      )}
                    </div>

                    {/* Expanded Order Details */}
                    {selectedOrder === order._id && (
                      <div className="mt-6 pt-6 border-t border-gray-200">
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <h5 className="font-semibold text-gray-800 mb-3">Order Summary</h5>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-gray-600">Subtotal:</span>
                                <span className="font-medium">{formatLkrPrice(order.total)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Shipping:</span>
                                <span className="font-medium">Free</span>
                              </div>
                              <div className="flex justify-between border-t pt-2">
                                <span className="font-semibold">Total:</span>
                                <span className="font-bold text-rose-600">{formatLkrPrice(order.total)}</span>
                              </div>
                            </div>
                          </div>
                          <div>
                            <h5 className="font-semibold text-gray-800 mb-3">Customer Information</h5>
                            <div className="space-y-2 text-sm">
                              <div>
                                <span className="text-gray-600">Name:</span>
                                <span className="ml-2 font-medium">{order.name}</span>
                              </div>
                              <div>
                                <span className="text-gray-600">Email:</span>
                                <span className="ml-2 font-medium">{order.email}</span>
                              </div>
                              {order.notes && order.notes !== "No additional notes" && (
                                <div>
                                  <span className="text-gray-600">Notes:</span>
                                  <p className="text-gray-800 mt-1 p-2 bg-gray-50 rounded">{order.notes}</p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors duration-300"
                >
                  Previous
                </button>
                
                <div className="flex gap-1">
                  {[...Array(totalPages)].map((_, index) => {
                    const pageNumber = index + 1;
                    return (
                      <button
                        key={pageNumber}
                        onClick={() => setCurrentPage(pageNumber)}
                        className={`px-3 py-2 rounded-lg transition-colors duration-300 ${
                          currentPage === pageNumber
                            ? 'bg-gradient-to-r from-rose-500 to-pink-600 text-white'
                            : 'bg-white/80 backdrop-blur-sm border border-gray-200 hover:bg-gray-50'
                        }`}
                      >
                        {pageNumber}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors duration-300"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}

        {/* Back to Shopping */}
        <div className="text-center mt-12">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-rose-600 hover:text-rose-700 font-semibold transition-colors duration-300"
          >
            Continue Shopping
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}