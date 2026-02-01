import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Link, Navigate, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import './index.css';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Imports
import Home from "./pages/Home";
import Veg from "./pages/Veg";
import NonVeg from "./pages/NonVeg";
import Snack from "./pages/Snack";
import Drinks from "./pages/Drinks";
import Dessert from "./pages/Dessert";
import Cart from "./pages/Cart";
import VegDetails from "./pages/VegDetails";
import NonVegDetails from "./pages/NonVegDetails";
import SnackDetails from "./pages/SnackDetails";
import DrinkDetails from "./pages/DrinksDetails";
import DessertDetails from "./pages/DessertDetails";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

// Auth
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { logout } from "./store";
import Order from "./pages/Order";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const token = useSelector((state) => state.auth.token);

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />

      {/* 🟢 Navbar Component */}
      <Navbar />

      {/* ROUTES */}
      <div className="main-content-area">
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />

          <Route path="/veg" element={<Veg />} />
          <Route path="/veg/:id" element={<ProtectedRoute><VegDetails /></ProtectedRoute>} />

          <Route path="/nonveg" element={<NonVeg />} />
          <Route path="/nonveg/:id" element={<ProtectedRoute><NonVegDetails /></ProtectedRoute>} />

          <Route path="/snack" element={<Snack />} />
          <Route path="/snack/:id" element={<ProtectedRoute><SnackDetails /></ProtectedRoute>} />

          <Route path="/drink" element={<Drinks />} />
          <Route path="/drink/:id" element={<ProtectedRoute><DrinkDetails /></ProtectedRoute>} />

          <Route path="/dessert" element={<Dessert />} />
          <Route path="/dessert/:id" element={<ProtectedRoute><DessertDetails /></ProtectedRoute>} />

          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<ProtectedRoute><Order /></ProtectedRoute>} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>

      {/* ⬇ Footer Hidden on Login & Register */}
      {location.pathname !== "/login" && location.pathname !== "/register" && <Footer />}
    </>
  );
}

export default function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

