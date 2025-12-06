import React, { useEffect, useState } from "react";
import "./Css/Veg.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchSnackProducts } from "../store";
import usePagination from "./usePagination";
import { toast } from "react-toastify";

function Snack() {
    const dispatch = useDispatch();
    

   // Fetch Snack Products
    useEffect(() => {
        dispatch(fetchSnackProducts());
    }, []);

  const { snackItems = [], loading, error } = useSelector((state) => state.products);



    // 🔍 SEARCH, PRICE RANGE, PAGINATION, ITEMS PER PAGE
    const [searchTerm, setSearchTerm] = useState("");
    const [itemsPerPage, setItemsPerPage] = useState(4);
    const [selectedRanges, setSelectedRanges] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    // Same price ranges used in Veg.jsx
    const priceRanges = [
        { id: 1, min: 0, max: 30, label: "₹0 – ₹30" },
        { id: 2, min: 30, max: 60, label: "₹30 – ₹60" },
        { id: 3, min: 60, max: 100, label: "₹60 – ₹100" }
    ];

    const toggleRange = (id) => {
        setSelectedRanges(prev =>
            prev.includes(id)
                ? prev.filter(r => r !== id)
                : [...prev, id]
        );
        setCurrentPage(1);
    };

    const filteredItems = snackItems.filter(item => {
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

    // HANDLERS
    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    const handleItemsPerPageChange = (e) => {
        setItemsPerPage(Number(e.target.value));
        setCurrentPage(1);
    };

    // 🔥 CUSTOM HOOK
    const {pageNumbers, goToPage } = usePagination({ currentPage, totalPages });

    return (
        <div className="container">

            <h1 className="text-center mb-2 veg-title">Delicious Snacks</h1>

            {/* ⭐ Filter Top Row */}
            <div className="filter-top-row">

                <input
                    type="text"
                    className="filter-search"
                    placeholder="Search Snacks"
                    value={searchTerm}
                    onChange={handleSearch}
                />

                <select
                    className="items-dropdown"
                    value={itemsPerPage}
                    onChange={handleItemsPerPageChange}
                >
                    <option value="4">Show 4</option>
                    <option value="8">Show 8</option>
                    <option value="12">Show 12</option>
                    <option value="16">Show 16</option>
                </select>

            </div>

            {/* ⭐ PRICE RANGE CHECKBOXES */}
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

            {/* ⭐ SNACK CARDS GRID */}
            <div className="row fade-animation">
                {currentItems.map(item => (
                    <div key={item.id} className="col-md-3">
                        <div className="card item-card h-100 shadow-sm animated-card">

                            <Link
                                to={`/snack/${item.id}`}
                                style={{ textDecoration: "none", color: "inherit" }}
                            >
                                <img
                                    src={item.image}
                                    className="card-img-top img-fluid"
                                    alt={item.name}
                                />
                            </Link>

                            <div className="card-body">
                                <h5 className="card-title d-flex justify-content-between">
                                    {item.name}
                                    <span className="badge bg-success">₹{item.price}</span>
                                </h5>

                                <p className="text-muted small">{item.description}</p>

                                <div className="d-flex justify-content-between align-items-center mt-3">
                                    <span className="badge bg-success">
                                        {item.ratings} ★
                                    </span>

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

            {/* ⭐ PAGINATION */}
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

export default Snack;
