import React from "react";
import { useParams } from "react-router-dom";
import "../styles/VegDetails.css";
import { addToCart } from "../store";
import { useDispatch } from "react-redux";

function VegDetails() {

    const { id } = useParams();

    // SAME DATA YOU USED IN Veg.jsx
    const vegItems = [
        { id: 1, name: "Paneer Butter Masala", price: 250, description: "Creamy paneer in buttery tomato gravy creating rich delight.", image: "/Veg/Paneer Butter Masala.avif", ratings: 4.5 },
        { id: 2, name: "Vegetable Biryani", price: 200, description: "Aromatic vegetable biryani delivering rich flavors and total satisfaction.", image: "/Veg/Vegetable Biryani.avif", ratings: 4.3 },
        { id: 3, name: "Chole Bhature", price: 150, description: "Spicy chole with bhature creates bold satisfying delightful taste.", image: "/Veg/Chole Bhature.jpg", ratings: 4.4 },
        { id: 4, name: "Masala Dosa", price: 120, description: "Crispy dosa with potato masala offers delicious unforgettable flavor.", image: "/Veg/Masala Dosa.avif", ratings: 4.6 },
        { id: 5, name: "Palak Paneer", price: 220, description: "Creamy spinach paneer delivers rich nutritious flavor satisfying cravings.", image: "/Veg/Palak Paneer.avif", ratings: 4.5 },
        { id: 6, name: "Aloo Gobi", price: 180, description: "Spiced potatoes and cauliflower create comforting flavorful classic delight.", image: "/Veg/Aloo Gobi.jpg", ratings: 4.2 },
        { id: 7, name: "Veg Manchurian", price: 160, description: "Crispy vegetable balls in spicy gravy deliver bold flavor.", image: "/Veg/Veg Manchurian.avif", ratings: 4.4 },
        { id: 8, name: "Dal Makhani", price: 190, description: "Slow-cooked lentils with cream offer rich smooth luxurious taste.", image: "/Veg/Dal Makhani.avif", ratings: 4.7 },
        { id: 9, name: "Shahi Paneer", price: 260, description: "Royal creamy paneer gravy delivers rich aromatic unforgettable flavor.", image: "/Veg/Shahi Paneer.avif", ratings: 4.6 },
        { id: 10, name: "Veg Pulao", price: 150, description: "Fragrant vegetable pulao delivers light flavorful satisfying wholesome experience.", image: "/Veg/Veg Pulao.jpg", ratings: 4.3 },
        { id: 11, name: "Poori Sabzi", price: 130, description: "Fluffy pooris with potato sabzi create comforting delicious traditional experience.", image: "/Veg/Poori Sabzi.avif", ratings: 4.4 },
        { id: 12, name: "Kadhai Paneer", price: 240, description: "Paneer with capsicum and spices delivers bold aromatic flavorful taste.", image: "/Veg/Kadhai Paneer.jpg", ratings: 4.6 },
        { id: 13, name: "Veg Fried Rice", price: 140, description: "Stir-fried rice with vegetables delivers simple aromatic delicious Indo-Chinese flavor.", image: "/Veg/Veg Fried Rice.jpg", ratings: 4.3 },
        { id: 14, name: "Idli Sambar", price: 100, description: "Soft idlis with sambar offer light healthy comforting South Indian flavor.", image: "/Veg/Idli Sambar.avif", ratings: 4.5 },
        { id: 15, name: "Paneer Tikka", price: 270, description: "Smoky grilled paneer offers spicy flavorful irresistible appetizer experience.", image: "/Veg/Paneer Tikka.avif", ratings: 4.7 },
        { id: 16, name: "Veg Hakka Noodles", price: 150, description: "Stir-fried noodles with vegetables deliver spicy aromatic delicious street-style flavor.", image: "/Veg/Veg Hakka Noodles.avif", ratings: 4.6 }
    ];

    const dispatch = useDispatch();

    const item = vegItems.find(p => p.id === Number(id));

    if (!item) {
        return <h2 className="text-center mt-5">Item Not Found</h2>;
    }

    return (
        <div className="container my-5 veg-details-page">

            <div className="row">

                {/* LEFT SECTION (IMAGES) */}
                <div className="col-md-5 text-center">

                    <div className="main-image-container shadow-sm">
                        <img src={item.image} alt={item.name} className="main-product-image" />
                    </div>

                    <div className="button-group mt-3">
                        <button className="btn btn-warning w-100 mb-2 fw-bold">BUY NOW</button>
                        <button className="btn btn-outline-primary w-100 fw-bold">
                            <i className="fas fa-shopping-cart" onClick={() => dispatch(addToCart(item))}></i> ADD TO CART
                        </button>
                    </div>
                </div>

                {/* RIGHT SECTION (DETAILS) */}
                <div className="col-md-7">

                    <h2 className="fw-bold">{item.name}</h2>

                    <div className="ratings mt-2 mb-2">
                        <span className="badge bg-success">{item.ratings} ★</span>
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

export default VegDetails;
