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

export default function ClientPage() {
    return(
        <div className="w-full h-screen max-h-screen">
            <Header/>
            <div className="w-full h-[calc(100%-100px)]">
                <Routes path="/">
                    <Route path="/" element={<h1 className="text-2xl text-center">Welcome to Home page</h1>} />
                    <Route path="/products" element={<ProductsPage/>} />
                    <Route path="/reviews" element={<Reviews/>}/>
                    <Route path="/about-us" element={<h1 className="text-2xl text-center">About Us Page</h1>} />
                    <Route path="/contact" element={<ContactUs />} />
                    <Route path="/postReview" element={<ReviewForm />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<CheckoutPage />} />
                    <Route path="/overview/:productId" element={<ProductOverviewPage />} />
                    <Route path="/*" element={<h1 className="text-2xl text-center">404 not found</h1>} />
                </Routes>
            </div>
        </div>
    )
}