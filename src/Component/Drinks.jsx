import React, { useEffect, useState } from "react";
// import Pagination from "./Pagination";
import "./Css/Veg.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../store";
import usePagination from "./usePagination";
import { toast } from "react-toastify";

function Drinks() {
    useEffect(() => {
        console.log("✅ Drinks component loaded");
    }, []);

    const drinkItems = [
        { id: 301, name: 'Mango Shake', price: 120, description: "Thick mango milkshake blended smoothly with crunchy dry fruits.", image: '/Drinks/Mango Shake.avif', ratings: 4.6 },

        { id: 302, name: 'Cold Coffee', price: 130, description: "Iced creamy cold coffee topped with smooth whipped cream.", image: '/Drinks/Cold Coffee.avif', ratings: 4.7 },

        { id: 303, name: 'Lemon Soda', price: 60, description: "Refreshing fizzy lemon soda mixed with fresh mint.", image: '/Drinks/Lemon Soda.avif', ratings: 4.5 },

        { id: 304, name: 'Buttermilk', price: 40, description: "Cool salted buttermilk flavored lightly with roasted cumin.", image: '/Drinks/Buttermilk.avif', ratings: 4.3 },

        { id: 305, name: 'Strawberry Shake', price: 140, description: "Fresh strawberry milkshake blended smoothly for perfect sweetness.", image: '/Drinks/Strawberry Shake.avif', ratings: 4.7 },

        { id: 306, name: 'Orange Juice', price: 100, description: "Freshly squeezed orange juice served chilled for refreshment.", image: '/Drinks/Orange Juice.jpg', ratings: 4.4 },

        { id: 307, name: 'Watermelon Juice', price: 80, description: "Pure watermelon juice served chilled for natural refreshing sweetness.", image: '/Drinks/Watermelon Juice.jpg', ratings: 4.6 },

        { id: 308, name: 'Hot Chocolate', price: 150, description: "Rich hot chocolate topped with smooth creamy whipped foam.", image: '/Drinks/Hot Chocolate.avif', ratings: 4.8 },

        { id: 309, name: 'Lassi', price: 90, description: "Sweet Punjabi lassi blended thick with creamy curd.", image: '/Drinks/Lassi.avif', ratings: 4.5 },

        { id: 310, name: 'Iced Tea', price: 70, description: "Chilled lemon iced tea brewed lightly with sweetness.", image: '/Drinks/Iced Tea.jpg', ratings: 4.4 }
    ];


    const priceRanges = [
        { id: 1, min: 0, max: 50, label: "₹0 – ₹50" },
        { id: 2, min: 50, max: 100, label: "₹50 – ₹100" },
        { id: 3, min: 100, max: 150, label: "₹100 – ₹150" }
    ];

    const dispatch = useDispatch();

    const [searchTerm, setSearchTerm] = useState("");
    const [itemsPerPage, setItemsPerPage] = useState(4);
    const [selectedRanges, setSelectedRanges] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    const handleItemsPerPageChange = (e) => {
        setItemsPerPage(Number(e.target.value));
        setCurrentPage(1);
    };

    const toggleRange = (id) => {
        setSelectedRanges(prev =>
            prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id]
        );
        setCurrentPage(1);
    };

    const filteredItems = drinkItems.filter(item => {
        const matchSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());

        const matchPrice =
            selectedRanges.length === 0 ||
            selectedRanges.some(rangeId => {
                const range = priceRanges.find(r => r.id === rangeId);
                return item.price >= range.min && item.price <= range.max;
            });

        return matchSearch && matchPrice;
    });

    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = filteredItems.slice(startIndex, startIndex + itemsPerPage);

    // 🔥 CUSTOM HOOK
    const {pageNumbers, goToPage } = usePagination({ currentPage, totalPages });

    return (
        <div className="container">

            <h1 className="text-center mb-2 veg-title">Refreshing Drinks</h1>

            {/* FILTER ROW */}
            <div className="filter-top-row">
                <input
                    type="text"
                    className="filter-search"
                    placeholder="Search Drinks"
                    value={searchTerm}
                    onChange={handleSearch}
                />

                <select
                    className="items-dropdown"
                    onChange={handleItemsPerPageChange}
                    value={itemsPerPage}
                >
                    <option value="4">Show 4</option>
                    <option value="8">Show 8</option>
                    <option value="12">Show 12</option>
                    <option value="16">Show 16</option>
                </select>
            </div>

            {/* PRICE RANGES */}
            <div className="price-checkbox-row">
                {priceRanges.map(range => (
                    <label key={range.id} className="custom-checkbox-label">
                        <input
                            type="checkbox"
                            checked={selectedRanges.includes(range.id)}
                            onChange={() => toggleRange(range.id)}
                        />
                        {range.label}
                    </label>
                ))}
            </div>

            {/* CARDS */}
            <div className="row fade-animation">
                {currentItems.map(item => (
                    <div key={item.id} className="col-md-3">
                        <div className="card item-card h-100 shadow-sm animated-card">

                            <Link to={`/drink/${item.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                                <img src={item.image} className="card-img-top img-fluid" alt={item.name} />
                            </Link>

                            <div className="card-body">
                                <h5 className="card-title d-flex justify-content-between">
                                    {item.name}
                                    <span className="badge bg-success">₹{item.price}</span>
                                </h5>

                                <p className="text-muted small">{item.description}</p>

                                <div className="d-flex justify-content-between align-items-center mt-3">
                                    <span className="badge bg-success">{item.ratings} ★</span>

                                    <button
                                        className="btn btn-outline-danger btn-sm rounded-pill"
                                        onClick={() =>{ dispatch(addToCart(item));
                                        toast.success(`${item.name} added to cart!`,
                                        {
                                            position: "top-right",
                                            autoClose: 2000,
                                            hideProgressBar: false,
                                            closeOnClick: true,
                                            pauseOnHover: true,
                                            draggable: true,
                                            progress: undefined,
                                        }
                                    );

                                    }}
                                    >
                                        <i className="fas fa-cart-plus"></i> Add to Cart
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>
                ))}
            </div>

            {/* PAGINATION */}
            <div className="pagination-container d-flex justify-content-center mt-4">
                <ul className="pagination modern-pagination">

                    {/* Prev Button */}
                    <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                        <button
                            className="page-link"
                            onClick={() => setCurrentPage(goToPage(currentPage - 1))}
                        >
                            ◀ Prev
                        </button>
                    </li>

                    {/* Page Numbers */}
                    {pageNumbers.map(num => (
                        <li
                            key={num}
                            className={`page-item ${currentPage === num ? "active" : ""}`}
                        >
                            <button
                                className="page-link"
                                onClick={() => setCurrentPage(goToPage(num))}
                            >
                                {num}
                            </button>
                        </li>
                    ))}

                    {/* Next Button */}
                    <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                        <button
                            className="page-link"
                            onClick={() => setCurrentPage(goToPage(currentPage + 1))}
                        >
                            Next ▶
                        </button>
                    </li>

                </ul>
            </div>

        </div>
    );
}

export default Drinks;
