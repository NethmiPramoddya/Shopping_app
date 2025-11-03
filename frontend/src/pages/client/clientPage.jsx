import Header from "../../components/header";
import { Routes, Route } from "react-router-dom";
import React from "react";
import ProductsPage from "./productspage";
import ProductOverviewPage from "./ProductOverviewPage";
import Cart from "./Cart";
import CheckoutPage from "./CheckoutPage";
import ContactUs from "../ContactUs";
import ReviewForm from "../../components/ReviewForm";
import Reviews from "./Reviews";
import  HomePage from "../homepage";
import AboutUs from "../AboutUs";
import ProductsPage1 from "./productspage1";
import ProductOverviewPage1 from "./ProductOverviewPage1";
import CheckoutPage1 from "./CheckoutPage1";
import PaymentPage from "./PaymentPage";
import PaymentSuccess from "./PaymentSuccess";
import MyOrders from "./MyOrders";

export default function ClientPage() {
    return(
        <div className="w-full h-screen max-h-screen">
            <Header/>
            <div className="w-full h-[calc(100%-100px)]">
                <Routes path="/">
                    <Route path="/" element={<HomePage/>} />
                    <Route path="/products" element={<ProductsPage1/>} />
                    <Route path="/reviews" element={<Reviews/>}/>
                    <Route path="/about-us" element={<AboutUs/>} />
                    <Route path="/contact" element={<ContactUs />} />
                    <Route path="/postReview" element={<ReviewForm />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<CheckoutPage1 />} />
                    <Route path="/payment" element={<PaymentPage />} />
                    <Route path="/payment-success" element={<PaymentSuccess />} />
                    <Route path="/orders" element={<MyOrders />} />
                    <Route path="/overview/:productId" element={<ProductOverviewPage1 />} />
                    <Route path="/*" element={<h1 className="text-2xl text-center">404 not found</h1>} />
                </Routes>
            </div>
        </div>
    )
}