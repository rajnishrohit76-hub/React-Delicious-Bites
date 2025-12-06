import React from "react";
import { useParams } from "react-router-dom";
import "./Css/VegDetails.css"; // reuse same styling

function DessertDetails() {

    const { id } = useParams();

    const dessertItems = [
        { id: 1, name: 'Gulab Jamun', price: 50, description: "Soft, syrup-soaked dumplings delivering sweet delight.", image: '/Desserts/Gulab Jamun.avif', rating: 4.6 },
        { id: 2, name: 'Rasgulla', price: 60, description: "Spongy, juicy cheese balls in light sugar syrup.", image: '/Desserts/Rasgulla.avif', rating: 4.5 },
        { id: 3, name: 'Chocolate Brownie', price: 120, description: "Rich chocolate brownie with soft fudgy center.", image: '/Desserts/Chocolate Brownie.avif', rating: 4.7 },
        { id: 4, name: 'Ice Cream', price: 90, description: "Cold creamy dessert in multiple flavors for refreshing taste.", image: '/Desserts/Ice Cream.avif', rating: 4.8 },
        { id: 5, name: 'Kulfi', price: 100, description: "Traditional Indian ice cream flavored with cardamom and pistachio.", image: '/Desserts/Kulfi.avif', rating: 4.7 },
        { id: 6, name: 'Carrot Halwa', price: 80, description: "Sweet carrot pudding cooked with ghee, milk, and nuts.", image: '/Desserts/Carrot Halwa.avif', rating: 4.6 },
        { id: 7, name: 'Jalebi', price: 40, description: "Crispy spiral-shaped dessert soaked in sugar syrup.", image: '/Desserts/Jalebi.avif', rating: 4.5 },
        { id: 8, name: 'Sandesh', price: 70, description: "Delicate Bengali sweet made from fresh paneer.", image: '/Desserts/Sandesh.avif', rating: 4.4 },
        { id: 9, name: 'Brownie Sundae', price: 150, description: "Warm brownie topped with ice cream and chocolate syrup.", image: '/Desserts/Brownie Sundae.avif', rating: 4.8 },
        { id: 10, name: 'Peda', price: 30, description: "Soft, milk-based sweet flavored with cardamom.", image: '/Desserts/Peda.avif', rating: 4.3 }
    ];

    const item = dessertItems.find(p => p.id === Number(id));

    if (!item) {
        return <h2 className="text-center mt-5">Item Not Found</h2>;
    }

    return (
        <div className="container my-5 veg-details-page">

            <div className="row">

                {/* LEFT SECTION (IMAGE) */}
                <div className="col-md-5 text-center">
                    <div className="main-image-container shadow-sm">
                        <img src={item.image} alt={item.name} className="main-product-image" />
                    </div>

                    <div className="button-group mt-3">
                        <button className="btn btn-warning w-100 mb-2 fw-bold">BUY NOW</button>
                        <button className="btn btn-outline-primary w-100 fw-bold">
                            <i className="fas fa-shopping-cart"></i> ADD TO CART
                        </button>
                    </div>
                </div>

                {/* RIGHT SECTION (DETAILS) */}
                <div className="col-md-7">
                    <h2 className="fw-bold">{item.name}</h2>

                    <div className="ratings mt-2 mb-2">
                        <span className="badge bg-success">{item.rating} ★</span>
                        <span className="text-muted ms-2">(Customer Ratings)</span>
                    </div>

                    <h3 className="text-success fw-bold">₹{item.price}</h3>
                    <p className="text-muted">{item.description}</p>

                    <hr />

                    <h5 className="mt-4">Specifications</h5>
                    <ul className="spec-list">
                        <li>⭐ High-quality fresh ingredients</li>
                        <li>⭐ Prepared by expert chefs</li>
                        <li>⭐ Hygienic & safe packaging</li>
                        <li>⭐ Fast delivery available</li>
                    </ul>

                    <hr />

                    <h5>Delivery Information</h5>
                    <p className="text-muted small">
                        Delivered within <strong>30-45 minutes</strong> in your area.
                    </p>
                </div>

            </div>

        </div>
    );
}

export default DessertDetails;
