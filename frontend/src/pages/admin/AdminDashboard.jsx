import axios from "axios";
import { useEffect, useState } from "react";
import { FiBox, FiShoppingCart, FiUsers, FiSettings } from "react-icons/fi";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

// Sample data
const userActivityData = [
  { day: "Mon", users: 30 },
  { day: "Tue", users: 50 },
  { day: "Wed", users: 45 },
  { day: "Thu", users: 60 },
  { day: "Fri", users: 70 },
  { day: "Sat", users: 55 },
  { day: "Sun", users: 80 },
];

const revenueData = [
  { month: "Jan", revenue: 1200 },
  { month: "Feb", revenue: 2100 },
  { month: "Mar", revenue: 1800 },
  { month: "Apr", revenue: 2500 },
  { month: "May", revenue: 2000 },
  { month: "Jun", revenue: 2700 },
];

export default function AdminDashboard() {
  const [summary, setSummary] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalUsers: 0
  });
      useEffect(() => {
        const token = localStorage.getItem("token"); // or wherever your JWT is stored

        // Axios call for dashboard summary
        axios
          .get("http://localhost:5000/api/dashboard/summary", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) =>
            setSummary((prev) => ({
              ...prev,
              totalProducts: res.data.totalProducts,
              totalOrders: res.data.totalOrders,
              totalUsers: res.data.totalUsers,
            }))
          )
          .catch((err) => console.error("Error fetching summary:", err));

        // TODO: Axios call for revenue data if backend endpoint exists
        // axios.get("http://localhost:5000/api/orders/revenue", {
        //   headers: { Authorization: `Bearer ${token}` },
        // })
        // .then(res => setRevenueData(res.data))
        // .catch(err => console.error(err));
      }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-white shadow rounded-lg p-5">
            <h2 className="text-lg font-semibold">Total Products</h2>
            <p className="text-2xl font-bold mt-2">{summary.totalProducts}</p>
          </div>
          <div className="bg-white shadow rounded-lg p-5">
            <h2 className="text-lg font-semibold">Total Orders</h2>
            <p className="text-2xl font-bold mt-2">{summary.totalOrders}</p>
          </div>
          <div className="bg-white shadow rounded-lg p-5">
            <h2 className="text-lg font-semibold">Total Users</h2>
            <p className="text-2xl font-bold mt-2">{summary.totalUsers}</p>
          </div>
          <div className="bg-white shadow rounded-lg p-5">
            <h2 className="text-lg font-semibold">Revenue</h2>
            <p className="text-2xl font-bold mt-2">$12.4k</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* User Activity Line Chart */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">User Activity</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={userActivityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="users" stroke="#4F46E5" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Revenue Bar Chart */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Revenue</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="revenue" fill="#10B981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </main>
    </div>
  );
}
