import React, { useEffect, useState } from "react";
// import Pagination from "./Pagination";
import "./Css/Veg.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../store";
import usePagination from "./usePagination";
import { toast } from "react-toastify";

function Desserts() {

    useEffect(() => {
        console.log("✅ Desserts component loaded");
    }, []);

    const dessertItems = [
        { id: 401, name: 'Gulab Jamun', price: 50, description: "Soft, syrup-soaked dumplings delivering sweet delight.", image: '/Desserts/Gulab Jamun.avif', ratings: 4.6 },

        { id: 402, name: 'Rasgulla', price: 60, description: "Spongy, juicy cheese balls in light sugar syrup.", image: '/Desserts/Rasgulla.avif', ratings: 4.5 },

        { id: 403, name: 'Chocolate Brownie', price: 120, description: "Rich chocolate brownie with soft fudgy center.", image: '/Desserts/Chocolate Brownie.avif', ratings: 4.7 },

        { id: 404, name: 'Ice Cream', price: 90, description: "Cold creamy dessert in multiple flavors for refreshing taste.", image: '/Desserts/Ice Cream.avif', ratings: 4.4 },

        { id: 405, name: 'Kulfi', price: 100, description: "Traditional Indian ice cream flavored with cardamom and pistachio.", image: '/Desserts/Kulfi.avif', ratings: 4.6 },

        { id: 406, name: 'Carrot Halwa', price: 80, description: "Sweet carrot pudding cooked with ghee, milk, and nuts.", image: '/Desserts/Carrot Halwa.jpg', ratings: 4.3 },

        { id: 407, name: 'Jalebi', price: 40, description: "Crispy spiral-shaped dessert soaked in sugar syrup.", image: '/Desserts/Jalebi.jpg', ratings: 4.5 },

        { id: 408, name: 'Sandesh', price: 70, description: "Delicate Bengali sweet made from fresh paneer.", image: '/Desserts/Sandesh.jpg', ratings: 4.4 },

        { id: 409, name: 'Brownie Sundae', price: 150, description: "Warm brownie topped with ice cream and chocolate syrup.", image: '/Desserts/Brownie Sundae.jpg', ratings: 4.8 },

        { id: 410, name: 'Peda', price: 30, description: "Soft, milk-based sweet flavored with cardamom.", image: '/Desserts/Peda.avif', ratings: 4.3 }
    ];


    const dispatch = useDispatch();

    const [searchTerm, setSearchTerm] = useState("");
    const [itemsPerPage, setItemsPerPage] = useState(4);

    const priceRanges = [
        { id: 1, min: 0, max: 50, label: "₹0 – ₹50" },
        { id: 2, min: 50, max: 100, label: "₹50 – ₹100" },
        { id: 3, min: 100, max: 200, label: "₹100 – ₹200" }
    ];

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

    const filteredItems = dessertItems.filter(item => {
        const matchSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchPrice =
            selectedRanges.length === 0 ||
            selectedRanges.some(rangeId => {
                const r = priceRanges.find(x => x.id === rangeId);
                return item.price >= r.min && item.price <= r.max;
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

            <h1 className="text-center mb-2 veg-title">Sweet Desserts</h1>

            {/* Search + Dropdown */}
            <div className="filter-top-row">

                <input
                    type="text"
                    className="filter-search"
                    placeholder="Search Desserts"
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

            {/* Price Checkbox */}
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

            {/* Cards */}
            <div className="row fade-animation">
                {currentItems.map(item => (
                    <div key={item.id} className="col-md-3">
                        <div className="card item-card h-100 shadow-sm animated-card">
                            <Link
                                to={`/dessert/${item.id}`}
                                style={{ textDecoration: "none", color: "inherit" }}
                            >
                                <img src={item.image} className="card-img-top img-fluid" alt={item.name} />
                            </Link>

                            <div className="card-body">
                                <h5 className="card-title d-flex justify-content-between">
                                    {item.name}
                                    <span className="badge bg-danger">₹{item.price}</span>
                                </h5>

                                <p className="text-muted small">{item.description}</p>

                                <div className="d-flex justify-content-between align-items-center mt-3">
                                    <span className="badge bg-warning text-dark">{item.ratings} ★</span>

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

            {/* Pagination */}
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

export default Desserts;
