import React from "react";
import { BrowserRouter, Routes, Route, Link, Navigate, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Imports
import Home from "./Component/Home";
import Veg from "./Component/Veg";
import NonVeg from "./Component/NonVeg";
import Snack from "./Component/Snack";
import Drinks from "./Component/Drinks";
import Dessert from "./Component/Dessert";
import Cart from "./Component/Cart";
import VegDetails from "./Component/VegDetails";
import NonVegDetails from "./Component/NonVegDetails";
import SnackDetails from "./Component/SnackDetails";
import DrinkDetails from "./Component/DrinksDetails";
import DessertDetails from "./Component/DessertDetails";
import Footer from "./Component/Footer"; // ⬅ ADDED Footer Import

// Auth
import ProtectedRoute from "./Component/ProtectedRoute";
import Login from "./Component/Login";
import Register from "./Component/Register";
import { logout } from "./store"; // ⬅ Make sure path is correct
import Order from "./Component/Order";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const token = useSelector((state) => state.auth.token);
  const cartItems = useSelector((state) => state.cart);

  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const isActive = (route) => (location.pathname === route ? "nav-link active" : "nav-link");

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      {/* 🟢 Navbar Always Visible */}
      <nav className="navbar navbar-expand-lg navbar-custom fixed-top">
        <div className="container">
          <div className="navbar-brand d-flex align-items-center">
            <Link to="/home">
              <img src="/logo.avif" alt="logo"
                style={{ width: 45, height: 45, marginRight: 10, borderRadius: 8 }} />
            </Link>
            <div>
              <Link to="/home" className="text-decoration-none text-white"><a className="bites" href="/home"></a>Delicious Bites</Link>
              <div className="brand-tagline">Fresh • Fast • Flavorful</div>
            </div>
          </div>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">

              <li className="nav-item"><Link to="/home" className={isActive("/home")}>Home</Link></li>
              <li className="nav-item"><Link to="/veg" className={isActive("/veg")}>Veg</Link></li>
              <li className="nav-item"><Link to="/nonveg" className={isActive("/nonveg")}>Non-Veg</Link></li>
              <li className="nav-item"><Link to="/snack" className={isActive("/snack")}>Snack</Link></li>
              <li className="nav-item"><Link to="/drink" className={isActive("/drink")}>Drinks</Link></li>
              <li className="nav-item"><Link to="/dessert" className={isActive("/dessert")}>Dessert</Link></li>

              <li className="nav-item position-relative">
                <Link to="/cart" className={isActive("/cart")}>Cart</Link>
                {cartItemCount > 0 && <span className="cart-badge">{cartItemCount}</span>}
              </li>

              <li className="nav-item"><Link to="/order" className={isActive("/order")}>Order</Link></li>

              {token ? (
                <li className="nav-item">
                  <button
                    className="btn btn-danger ms-3"
                    onClick={() => {
                      dispatch(logout());
                      navigate("/login");
                    }}>
                    Logout
                  </button>
                </li>
              ) : (
                <li className="nav-item">
                  <Link to="/login" className={isActive("/login")}>Sign In</Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>

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

      {/* 🟢 Footer Always Visible Except Login & Register */}
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







// ========================================================================================


// import React from "react";
// import { BrowserRouter, Routes, Route, Link, Navigate, useNavigate, useLocation } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import "./App.css";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// // Imports
// import Home from "./Component/Home";
// import Veg from "./Component/Veg";
// import NonVeg from "./Component/NonVeg";
// import Snack from "./Component/Snack";
// import Drinks from "./Component/Drinks";
// import Dessert from "./Component/Dessert";
// import Cart from "./Component/Cart";
// import VegDetails from "./Component/VegDetails";
// import NonVegDetails from "./Component/NonVegDetails";
// import SnackDetails from "./Component/SnackDetails";
// import DrinkDetails from "./Component/DrinksDetails";
// import DessertDetails from "./Component/DessertDetails";

// // Auth
// import ProtectedRoute from "./Component/ProtectedRoute";
// import Login from "./Component/Login";
// import Register from "./Component/Register";
// import { logout } from "./store"; // ⬅ Make sure path is correct
// import Order from "./Component/Order";

// function App() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const location = useLocation();

//   const token = useSelector((state) => state.auth.token);
//   const cartItems = useSelector((state) => state.cart);

//   const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

//   const isActive = (route) => (location.pathname === route ? "nav-link active" : "nav-link");

//   return (
//     <>
//       <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />

//       {/* NAVBAR */}
//       <nav className="navbar navbar-expand-lg navbar-custom fixed-top">
//         <div className="container">
//           <div className="navbar-brand d-flex align-items-center">
//             <Link to="/home"><img src="/logo.avif" alt="logo" style={{ width: 45, height: 45, marginRight: 10, borderRadius: 8 }} /></Link>
//             <div>
//               <div><Link to="/home" className="text-decoration-none text-white">Delicious Bites</Link></div>
//               <div className="brand-tagline">Fresh • Fast • Flavorful</div>
//             </div>
//           </div>

//           <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
//             <span className="navbar-toggler-icon"></span>
//           </button>

//           <div className="collapse navbar-collapse" id="navbarNav">
//             <ul className="navbar-nav ms-auto">
//               <li className="nav-item"><Link to="/home" className={isActive("/home")}>Home</Link></li>
//               <li className="nav-item"><Link to="/veg" className={isActive("/veg")}>Veg</Link></li>
//               <li className="nav-item"><Link to="/nonveg" className={isActive("/nonveg")}>Non-Veg</Link></li>
//               <li className="nav-item"><Link to="/snack" className={isActive("/snack")}>Snack</Link></li>
//               <li className="nav-item"><Link to="/drink" className={isActive("/drink")}>Drinks</Link></li>
//               <li className="nav-item"><Link to="/dessert" className={isActive("/dessert")}>Dessert</Link></li>

//               <li className="nav-item position-relative">
//                 <Link to="/cart" className={isActive("/cart")}>Cart</Link>
//                 {cartItemCount > 0 && <span className="cart-badge">{cartItemCount}</span>}
//               </li>

//               <li className="nav-item"><Link to="/order" className={isActive("/order")}>Order</Link></li>

//               {token ? (
//                 <li className="nav-item">
//                   <button
//                     className="btn btn-danger ms-3"
//                     onClick={() => {
//                       dispatch(logout());
//                       navigate("/login");
//                     }}>
//                     Logout
//                   </button>
//                 </li>
//               ) : (
//                 <li className="nav-item">
//                   <Link to="/login" className={isActive("/login")}>Sign In</Link>
//                 </li>
//               )}
//             </ul>
//           </div>
//         </div>
//       </nav>

//       {/* ROUTES */}
//       <div style={{ marginTop: 120 }}>
//         <Routes>
//           <Route path="/" element={<Navigate to="/home" />} />
//           <Route path="/home" element={<Home />} />
//           <Route path="/veg" element={<Veg />} />
          
//           {/* Protected Routes */}
//           <Route path="/veg/:id" element={<ProtectedRoute><VegDetails /></ProtectedRoute>} />
//           <Route path="/nonveg" element={<NonVeg />} />
//           <Route path="/nonveg/:id" element={<ProtectedRoute><NonVegDetails /></ProtectedRoute>} />
//           <Route path="/snack" element={<Snack />} />
//           <Route path="/snack/:id" element={<ProtectedRoute><SnackDetails /></ProtectedRoute>} />
//           <Route path="/drink" element={<Drinks />} />
//           <Route path="/drink/:id" element={<ProtectedRoute><DrinkDetails /></ProtectedRoute>} />
//           <Route path="/dessert" element={<Dessert />} />
//           <Route path="/dessert/:id" element={<ProtectedRoute><DessertDetails /></ProtectedRoute>} />
//           <Route path="/cart" element={<Cart />} />
//           <Route path="/order" element={<ProtectedRoute><Order /></ProtectedRoute>} />

//           {/* Auth */}
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />

//         </Routes>
//       </div>
//     </>
//   );
// }

// export default function AppWrapper() {
//   return (
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   );
// }

// =========================================================================================

// import React from "react";
// import { BrowserRouter, Routes, Route, Link, Navigate, useLocation } from "react-router-dom";
// import { useSelector } from "react-redux";
// import "./App.css";

// // Normal imports (no lazy)
// import Home from "./Component/Home";
// import Veg from "./Component/Veg";
// import NonVeg from "./Component/NonVeg";
// import Snack from "./Component/Snack";
// import Drinks from "./Component/Drinks";
// import Dessert from "./Component/Dessert";
// import Cart from "./Component/Cart";
// import VegDetails from "./Component/VegDetails";
// import NonVegDetails from "./Component/NonVegDetails";
// import SnackDetails from "./Component/SnackDetails";
// import DrinkDetails from "./Component/DrinksDetails";
// import DessertDetails from "./Component/DessertDetails";

// function App() {
//   const location = useLocation();
//   const cartItems = useSelector((state) => state.cart);
//   const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

//   const isActive = (route) => (location.pathname === route ? "nav-link active" : "nav-link");

//   return (
//     <>
//       {/* NAVBAR */}
//       <nav className="navbar navbar-expand-lg navbar-custom fixed-top">
//         <div className="container">
//           <div className="navbar-brand d-flex align-items-center">
//             <img src="/logo.avif" alt="logo" style={{ width: 45, height: 45, marginRight: 10, borderRadius: 8 }} />
//             <div>
//               <div>Delicious Bites</div>
//               <div className="brand-tagline">Fresh • Fast • Flavorful</div>
//             </div>
//           </div>

//           <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
//             <span className="navbar-toggler-icon"></span>
//           </button>

//           <div className="collapse navbar-collapse" id="navbarNav">
//             <ul className="navbar-nav ms-auto">
//               <li className="nav-item"><Link to="/home" className={isActive("/home")}>Home</Link></li>
//               <li className="nav-item"><Link to="/veg" className={isActive("/veg")}>Veg</Link></li>
//               <li className="nav-item"><Link to="/nonveg" className={isActive("/nonveg")}>Non-Veg</Link></li>
//               <li className="nav-item"><Link to="/snack" className={isActive("/snack")}>Snack</Link></li>
//               <li className="nav-item"><Link to="/drink" className={isActive("/drink")}>Drinks</Link></li>
//               <li className="nav-item"><Link to="/dessert" className={isActive("/dessert")}>Dessert</Link></li>
//               <li className="nav-item position-relative">
//                 <Link to="/cart" className={isActive("/cart")}>Cart</Link>
//                 {cartItemCount > 0 && <span className="cart-badge">{cartItemCount}</span>}
//               </li>
//               <li className="nav-item"><Link to="/signin" className={isActive("/signin")}>Sign In</Link></li>
//             </ul>
//           </div>
//         </div>
//       </nav>

//       {/* ROUTES */}
//       <div style={{ marginTop: 120 }}>
//         <Routes>
//           <Route path="/" element={<Navigate to="/home" />} />
//           <Route path="/home" element={<Home />} />
//           <Route path="/veg" element={<Veg />} />
//           <Route path="/veg/:id" element={<VegDetails />} />
//           <Route path="/nonveg" element={<NonVeg />} />
//           <Route path="/nonveg/:id" element={<NonVegDetails />} />
//           <Route path="/snack" element={<Snack />} />
//           <Route path="/snack/:id" element={<SnackDetails />} />
//           <Route path="/drink" element={<Drinks />} />
//           <Route path="/drink/:id" element={<DrinkDetails />} />
//           <Route path="/dessert" element={<Dessert />} />
//           <Route path="/dessert/:id" element={<DessertDetails />} />
//           <Route path="/cart" element={<Cart />} />
//           <Route path="/signin" element={<h2 className='text-center mt-5'>Sign In Page</h2>} />
//         </Routes>
//       </div>
//     </>
//   );
// }

// function AppWrapper() {
//   return (
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   );
// }

// export default AppWrapper;

