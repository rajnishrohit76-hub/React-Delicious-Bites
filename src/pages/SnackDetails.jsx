import React from "react";
import { useParams } from "react-router-dom";
import "../styles/VegDetails.css"; // reuse same styling

function SnackDetails() {

    const { id } = useParams();

    const snackItems = [
        { id: 1, name: "Samosa", price: 20, description: "Crispy fried triangles filled with spicy seasoned potatoes.", image: "/Snacks/Samosa.avif", rating: 4.6 },
        { id: 2, name: "Kachori", price: 25, description: "Flaky golden kachori stuffed with flavorful spicy dal.", image: "/Snacks/Kachori.avif", rating: 4.5 },
        { id: 3, name: "Vada Pav", price: 30, description: "Spicy potato vada served inside soft buttered pav.", image: "/Snacks/Vada Pav.jpg", rating: 4.7 },
        { id: 4, name: "Pani Puri", price: 40, description: "Crispy puris filled with tangy spicy flavored water.", image: "/Snacks/Pani Puri.jpg", rating: 4.8 },
        { id: 5, name: "Bhel Puri", price: 35, description: "Puffed rice mixed with chutneys, sev, crunchy vegetables.", image: "/Snacks/Bhel Puri.jpg", rating: 4.6 },
        { id: 6, name: "Aloo Tikki", price: 50, description: "Crispy potato patties served with tangy flavorful chutneys.", image: "/Snacks/Aloo Tikki.avif", rating: 4.7 },
        { id: 7, name: "Dhokla", price: 60, description: "Soft fluffy steamed snack tempered with mustard seeds.", image: "/Snacks/Dhokla.jpg", rating: 4.5 },
        { id: 8, name: "Chole Kulche", price: 80, description: "Soft kulchas served alongside spicy flavorful chole curry.", image: "/Snacks/Chole Kulche.avif", rating: 4.8 },
        { id: 9, name: "Pakora", price: 45, description: "Crispy gram-flour fritters made with assorted fresh vegetables.", image: "/Snacks/Pakora.avif", rating: 4.6 },
        { id: 10, name: "Onion Rings", price: 70, description: "Golden crispy onion rings coated in seasoned batter.", image: "/Snacks/Onion Rings.avif", rating: 4.4 },
        { id: 11, name: "Momos", price: 90, description: "Steamed dumplings filled with mixed vegetables and spices.", image: "/Snacks/Momos.avif", rating: 4.9 },
        { id: 12, name: "Spring Rolls", price: 85, description: "Crispy rolls stuffed with seasoned mixed vegetable filling.", image: "/Snacks/Spring Rolls.jpg", rating: 4.6 },
        { id: 13, name: "Bread Pakoda", price: 25, description: "Bread slices stuffed with spiced potato filling, fried.", image: "/Snacks/Bread Pakoda.avif", rating: 4.3 },
        { id: 14, name: "Corn Chat", price: 60, description: "Masala sweet corn mixed with spices, butter, lemon.", image: "/Snacks/Corn Chat.jpg", rating: 4.5 },
        { id: 15, name: "French Fries", price: 75, description: "Classic golden crispy fries served hot with seasoning.", image: "/Snacks/French Fries.avif", rating: 4.7 },
        { id: 16, name: "Cutlet", price: 50, description: "Crispy vegetable cutlets seasoned with spices and herbs.", image: "/Snacks/Cutlet.jpg", rating: 4.4 },
    ];

    const item = snackItems.find(p => p.id === Number(id));

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

export default SnackDetails;
