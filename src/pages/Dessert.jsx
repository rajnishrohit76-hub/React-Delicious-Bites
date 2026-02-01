import React, { useEffect, useState } from "react";
import { MorphingSquare } from "../components/ui/morphing-square";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addToCart, fetchDessertProducts } from "../store";
import usePagination from "../hooks/usePagination";
import "../styles/Veg.css";
import { toast } from "react-toastify";

function Desserts() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 📌 Fetch Desserts
  useEffect(() => {
    dispatch(fetchDessertProducts());
  }, [dispatch]);

  const { dessertItems = [], loading, error } = useSelector(
    (state) => state.products
  );
  const { cart = [] } = useSelector((state) => state.cart);

  // 🍰 Filters & Pagination states
  const [searchTerm, setSearchTerm] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [selectedRanges, setSelectedRanges] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const priceRanges = [
    { id: 1, min: 0, max: 50, label: "₹0 – ₹50" },
    { id: 2, min: 50, max: 100, label: "₹50 – ₹100" },
    { id: 3, min: 100, max: 200, label: "₹100 – ₹200" },
  ];

  const toggleRange = (id) => {
    setSelectedRanges((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    );
    setCurrentPage(1);
  };

  // 🔍 Filtering
  const filteredItems = dessertItems.filter((item) => {
    const matchSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchPrice =
      selectedRanges.length === 0 ||
      selectedRanges.some((rangeId) => {
        const r = priceRanges.find((x) => x.id === rangeId);
        return item.price >= r.min && item.price <= r.max;
      });
    return matchSearch && matchPrice;
  });

  // 🔢 Pagination
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredItems.slice(startIndex, startIndex + itemsPerPage);
  const { pageNumbers, goToPage } = usePagination({ currentPage, totalPages });

  // Check if item exists in cart
  const isInCart = (id) => cart.some((p) => p._id === id);

  return (
    <div className="container">
      <h1 className="text-center mb-2 veg-title hero">Sweet Desserts</h1>

      {/* 🔍 Search + Items per page */}
      <div className="filter-top-row">
        <input
          type="text"
          className="filter-search"
          placeholder="Search Desserts..."
          value={searchTerm}
          onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
        />
        <select
          className="items-dropdown"
          value={itemsPerPage}
          onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }}
        >
          <option value="4">Show 4</option>
          <option value="8">Show 8</option>
          <option value="12">Show 12</option>
          <option value="16">Show 16</option>
        </select>
      </div>

      {/* 💰 Price Filters */}
      <div className="price-checkbox-row">
        {priceRanges.map((range) => (
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

      {/* ⏳ Loading & ❌ Error */}
      {loading && (
        <div className="flex justify-center my-10">
          <MorphingSquare message="Loading Dessert Items..." />
        </div>
      )}
      {error && <p className="text-center text-danger">{error?.message || (typeof error === 'string' ? error : "An error occurred")}</p>}
      {!loading && currentItems.length === 0 && (
        <p className="text-center text-muted">No items found!</p>
      )}

      {/* 🍪 Dessert Cards */}
      <div className="row fade-animation">
        {currentItems.map((item) => (
          <div key={item._id} className="col-md-3 mb-4">
            <div className="card item-card h-100 shadow-sm animated-card">
              <Link
                to={`/dessert/${item._id}`}
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

                  {isInCart(item._id) ? (
                    <button
                      className="btn btn-success btn-sm rounded-pill"
                      onClick={() => navigate("/cart")}
                    >
                      🛒 Go to Cart
                    </button>
                  ) : (
                    <button
                      className="btn btn-outline-danger btn-sm rounded-pill"
                      onClick={() => {
                        dispatch(addToCart(item));
                        toast.success(`${item.name} added to cart!`, {
                          position: "top-right",
                          autoClose: 1500,
                        });
                      }}
                    >
                      <i className="fas fa-cart-plus"></i> Add to Cart
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 🔢 Pagination */}
      {!loading && totalPages > 1 && (
        <div className="pagination-container d-flex justify-content-center mt-4">
          <ul className="pagination modern-pagination">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button className="page-link" onClick={() => setCurrentPage(goToPage(currentPage - 1))}>
                ◀ Prev
              </button>
            </li>

            {pageNumbers.map((num) => (
              <li key={num} className={`page-item ${currentPage === num ? "active" : ""}`}>
                <button className="page-link" onClick={() => setCurrentPage(goToPage(num))}>
                  {num}
                </button>
              </li>
            ))}

            <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
              <button className="page-link" onClick={() => setCurrentPage(goToPage(currentPage + 1))}>
                Next ▶
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Desserts;
