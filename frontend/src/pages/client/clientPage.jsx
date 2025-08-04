import Header from "../../components/header";
import { Routes, Route } from "react-router-dom";
import React from "react";

export default function ClientPage() {
    return(
        <div className="w-full h-screen max-h-screen">
            <Header/>
            <div className="w-full h-[calc(100%-100px)] bg-amber-500">
                <Routes path="/">
                    <Route path="/" element={<h1 className="text-2xl text-center">Welcome t0 Home page</h1>} />
                    <Route path="/products" element={<h1 className="text-2xl text-center">Products Page</h1>} />
                    <Route path="/reviews" element={<h1 className="text-2xl text-center">Reviews Page</h1>} />
                    <Route path="/about-us" element={<h1 className="text-2xl text-center">About Us Page</h1>} />
                    <Route path="/contact" element={<h1 className="text-2xl text-center">Contact Us Page</h1>} />
                    <Route path="/*" element={<h1 className="text-2xl text-center">404 not found</h1>} />
                </Routes>
            </div>
        </div>
    )
}