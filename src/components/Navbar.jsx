import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Redux state
    const token = useSelector((state) => state.auth.token);
    const cartItems = useSelector((state) => state.cart.cart) || [];
    const cartItemCount = Array.isArray(cartItems)
        ? cartItems.reduce((total, item) => total + item.quantity, 0)
        : 0;

    // Active link helper
    const isActive = (path) => {
        return location.pathname === path
            ? "bg-white/20 !text-white shadow-lg no-underline"
            : "!text-white/80 hover:!text-white hover:bg-white/10 no-underline transition-all duration-200";
    };

    const closeMenu = () => setIsOpen(false);

    return (
        <nav className="fixed top-0 w-full z-50 bg-black backdrop-blur-md border-b border-white/10 shadow-xl transition-all duration-300">
            <div className="container mx-auto px-4 md:px-6 py-3 flex items-center justify-between">

                {/* 🌟 LOGO + BRAND */}
                <Link
                    to="/home"
                    className="flex items-center group no-underline !text-white"
                    onClick={closeMenu}
                    style={{ color: 'white', textDecoration: 'none' }}
                >
                    <img
                        src="/logo.avif"
                        alt="logo"
                        className="w-10 h-10 md:w-12 md:h-12 rounded-lg mr-3 shadow-md group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="flex flex-col">
                        <span className="text-xl md:text-2xl font-bold !text-white tracking-wide group-hover:text-red-400 transition-colors no-underline">
                            Delicious Bites
                        </span>
                        <span className="text-xs text-gray-400 font-light tracking-wider hidden sm:block no-underline">
                            Fresh • Fast • Flavorful
                        </span>
                    </div>
                </Link>

                {/* 🍔 Mobile Hamburger */}
                <button
                    className="md:hidden text-white focus:outline-none p-2 rounded-md hover:bg-white/10 transition"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle menu"
                >
                    {isOpen ? (
                        <i className="fa-solid fa-xmark text-2xl" />
                    ) : (
                        <i className="fa-solid fa-bars text-2xl" />
                    )}
                </button>

                {/* 🌐 Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-6">
                    <NavLink to="/home" isActive={isActive} onClick={closeMenu}>Home</NavLink>
                    <NavLink to="/veg" isActive={isActive} onClick={closeMenu}>Veg</NavLink>
                    <NavLink to="/nonveg" isActive={isActive} onClick={closeMenu}>Non-Veg</NavLink>
                    <NavLink to="/snack" isActive={isActive} onClick={closeMenu}>Snack</NavLink>
                    <NavLink to="/drink" isActive={isActive} onClick={closeMenu}>Drinks</NavLink>
                    <NavLink to="/dessert" isActive={isActive} onClick={closeMenu}>Dessert</NavLink>

                    {/* Cart */}
                    <Link
                        to="/cart"
                        className={`relative px-4 py-2 rounded-full font-medium transition-all duration-300 flex items-center no-underline ${isActive("/cart")}`}
                    >
                        <span>Cart</span>
                        {cartItemCount > 0 && (
                            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow-red-500/50 shadow-lg animate-pulse">
                                {cartItemCount}
                            </span>
                        )}
                    </Link>

                    <NavLink to="/order" isActive={isActive} onClick={closeMenu}>Order</NavLink>

                    {/* Auth Buttons */}
                    {token ? (
                        <button
                            onClick={() => {
                                dispatch(logout());
                                navigate("/login");
                            }}
                            className="ml-4 px-5 py-2 rounded-full bg-red-600 hover:bg-red-700 text-white font-semibold shadow-lg hover:shadow-red-600/40 transition-all transform hover:-translate-y-0.5 no-underline"
                        >
                            Logout
                        </button>
                    ) : (
                        <Link
                            to="/login"
                            className={`ml-2 px-5 py-2 rounded-full border border-white/30 font-semibold transition-all hover:bg-white hover:text-black no-underline ${isActive("/login")}`}
                        >
                            Sign In
                        </Link>
                    )}
                </div>
            </div>

            {/* 📱 Mobile Dropdown Menu */}
            {/* Absolute positioning to float over content with a dark background */}
            <div
                className={`md:hidden absolute top-full left-0 w-full bg-black/95 backdrop-blur-xl border-t border-white/10 shadow-2xl overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-[500px] opacity-100 py-4" : "max-h-0 opacity-0"
                    }`}
            >
                <div className="flex flex-col space-y-2 px-6">
                    <MobileNavLink to="/home" isActive={isActive} onClick={closeMenu}>Home</MobileNavLink>
                    <MobileNavLink to="/veg" isActive={isActive} onClick={closeMenu}>Veg</MobileNavLink>
                    <MobileNavLink to="/nonveg" isActive={isActive} onClick={closeMenu}>Non-Veg</MobileNavLink>
                    <MobileNavLink to="/snack" isActive={isActive} onClick={closeMenu}>Snack</MobileNavLink>
                    <MobileNavLink to="/drink" isActive={isActive} onClick={closeMenu}>Drinks</MobileNavLink>
                    <MobileNavLink to="/dessert" isActive={isActive} onClick={closeMenu}>Dessert</MobileNavLink>

                    <div className="flex items-center justify-between py-2 border-t border-white/10 mt-2 pt-4">
                        <Link
                            to="/cart"
                            onClick={closeMenu}
                            className="flex items-center text-gray-200 hover:text-white font-medium no-underline"
                        >
                            <span className="mr-2">Cart</span>
                            {cartItemCount > 0 && (
                                <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                                    {cartItemCount}
                                </span>
                            )}
                        </Link>
                        <Link to="/order" onClick={closeMenu} className="text-gray-200 hover:text-white font-medium no-underline">Order</Link>
                    </div>

                    <div className="pt-2">
                        {token ? (
                            <button
                                onClick={() => {
                                    dispatch(logout());
                                    navigate("/login");
                                    closeMenu();
                                }}
                                className="w-full text-center py-2 rounded-lg bg-red-600/90 text-white font-bold hover:bg-red-600 transition no-underline"
                            >
                                Logout
                            </button>
                        ) : (
                            <Link
                                to="/login"
                                onClick={closeMenu}
                                className="block w-full text-center py-2 rounded-lg bg-white/10 text-white font-bold hover:bg-white/20 transition border border-white/10 no-underline"
                            >
                                Sign In
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}

// Sub-components for cleaner code
function NavLink({ to, children, isActive, onClick }) {
    return (
        <Link
            to={to}
            onClick={onClick}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 no-underline ${isActive(to)}`}
        >
            {children}
        </Link>
    );
}

function MobileNavLink({ to, children, isActive, onClick }) {
    return (
        <Link
            to={to}
            onClick={onClick}
            className={`block px-4 py-3 rounded-xl text-base font-medium transition-all no-underline ${isActive(to).includes("bg-white")
                ? "bg-white/10 text-white border border-white/10"
                : "text-gray-300 hover:bg-white/5 hover:text-white"
                }`}
        >
            {children}
        </Link>
    );
}
