import React from "react";
import { useParams } from "react-router-dom";
import "./Css/VegDetails.css"; // reuse the same styling

function DrinkDetails() {
    const { id } = useParams();

    const drinkItems = [
        { id: 1, name: 'Mango Shake', price: 120, description: "Thick mango milkshake blended smoothly with crunchy dry fruits.", image: '/Drinks/Mango Shake.avif' },
        { id: 2, name: 'Cold Coffee', price: 130, description: "Iced creamy cold coffee topped with smooth whipped cream.", image: '/Drinks/Cold Coffee.avif' },
        { id: 3, name: 'Lemon Soda', price: 60, description: "Refreshing fizzy lemon soda mixed with fresh mint.", image: '/Drinks/Lemon Soda.avif' },
        { id: 4, name: 'Buttermilk', price: 40, description: "Cool salted buttermilk flavored lightly with roasted cumin.", image: '/Drinks/Buttermilk.avif' },
        { id: 5, name: 'Strawberry Shake', price: 140, description: "Fresh strawberry milkshake blended smoothly for perfect sweetness.", image: '/Drinks/Strawberry Shake.avif' },
        { id: 6, name: 'Orange Juice', price: 100, description: "Freshly squeezed orange juice served chilled for refreshment.", image: '/Drinks/Orange Juice.jpg' },
        { id: 7, name: 'Watermelon Juice', price: 80, description: "Pure watermelon juice served chilled for natural refreshing sweetness.", image: '/Drinks/Watermelon Juice.jpg' },
        { id: 8, name: 'Hot Chocolate', price: 150, description: "Rich hot chocolate topped with smooth creamy whipped foam.", image: '/Drinks/Hot Chocolate.avif' },
        { id: 9, name: 'Lassi', price: 90, description: "Sweet Punjabi lassi blended thick with creamy curd.", image: '/Drinks/Lassi.avif' },
        { id: 10, name: 'Iced Tea', price: 70, description: "Chilled lemon iced tea brewed lightly with sweetness.", image: '/Drinks/Iced Tea.jpg' }
    ];

    const item = drinkItems.find(p => p.id === Number(id));

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
                        <span className="badge bg-success">4.6 ★</span>
                        <span className="text-muted ms-2">(Customer Ratings)</span>
                    </div>

                    <h3 className="text-success fw-bold">₹{item.price}</h3>
                    <p className="text-muted">{item.description}</p>

                    <hr />

                    <h5 className="mt-4">Specifications</h5>
                    <ul className="spec-list">
                        <li>⭐ Fresh ingredients</li>
                        <li>⭐ Prepared hygienically</li>
                        <li>⭐ Expertly blended for taste</li>
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

export default DrinkDetails;
