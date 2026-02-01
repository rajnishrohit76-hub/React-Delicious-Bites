import React from "react";
import { useParams } from "react-router-dom";
import "../styles/VegDetails.css"; // reuse the same styling

function NonVegDetails() {

    const { id } = useParams();

    // SAME DATA AS NonVeg.jsx
    const nonVegItems = [
        { id: 1, name: 'Chicken Biryani', price: 300, description: 'Aromatic chicken biryani delivering rich flavors and satisfying delight.', image: '/NonVeg/Chicken Biryani.avif', ratings: 4.2 },
        { id: 2, name: 'Butter Chicken', price: 350, description: 'Creamy buttery chicken gravy offering rich delicious unforgettable taste.', image: '/NonVeg/Butter Chicken.avif', ratings: 4.5 },
        { id: 3, name: 'Mutton Rogan Josh', price: 420, description: 'Spicy Kashmiri mutton curry delivering bold aromatic flavorful richness.', image: '/NonVeg/Mutton Rogan Josh.avif', ratings: 4.3 },
        { id: 4, name: 'Chicken Tikka', price: 280, description: 'Smoky marinated chicken grilled perfectly offering irresistible flavorful experience.', image: '/NonVeg/Chicken Tikka.avif', ratings: 4.4 },
        { id: 5, name: 'Fish Fry', price: 260, description: 'Crispy spiced fried fish delivering delicious crunchy satisfying seafood flavor.', image: '/NonVeg/Fish Fry.avif', ratings: 4.1 },
        { id: 6, name: 'Egg Curry', price: 150, description: 'Boiled eggs simmered in spicy flavorful onion tomato gravy.', image: '/NonVeg/Egg Curry.jpg', ratings: 4.0 },
        { id: 7, name: 'Prawn Masala', price: 380, description: 'Juicy prawns cooked in spicy masala delivering bold delightful flavors.', image: '/NonVeg/Prawn Masala.jpg', ratings: 4.3 },
        { id: 8, name: 'Chicken Shawarma', price: 120, description: 'Soft wrap filled with roasted chicken delivering flavorful Middle Eastern taste.', image: '/NonVeg/Chicken Shawarma.jpg', ratings: 4.2 },
        { id: 9, name: 'Chicken Lolipop', price: 200, description: 'Crispy fried chicken wings offering spicy crunchy irresistible appetizer experience.', image: '/NonVeg/Chicken Lolipop.avif', ratings: 4.4 },
        { id: 10, name: 'Mutton Biryani', price: 450, description: 'Tender mutton biryani served with aromatic spices delivering rich flavors.', image: '/NonVeg/Mutton Biryani.avif', ratings: 4.5 },
        { id: 11, name: 'Fish Curry', price: 300, description: 'Tangy coconut fish curry delivering authentic coastal flavors and satisfaction.', image: '/NonVeg/Fish Curry.avif', ratings: 4.3 },
        { id: 12, name: 'Chicken Hakka Noodles', price: 180, description: 'Stir-fried noodles with chicken creating spicy aromatic Indo-Chinese flavor.', image: '/NonVeg/Chicken Hakka Noodles.jpg', ratings: 4.8 },
        { id: 13, name: 'Chicken Fried Rice', price: 170, description: 'Indo-Chinese chicken fried rice delivering simple delicious aromatic flavorful experience.', image: '/NonVeg/Chicken Fried Rice.jpg', ratings: 4.6 },
        { id: 14, name: 'Tandoori Chicken', price: 320, description: 'Clay-oven roasted chicken offering smoky spicy flavorful traditional Indian taste.', image: '/NonVeg/Tandoori Chicken.avif', ratings: 4.3 },
        { id: 15, name: 'Egg Biryani', price: 180, description: 'Flavored rice with boiled eggs offering satisfying aromatic biryani experience.', image: '/NonVeg/Egg Biryani.avif', ratings: 4.1 },
        { id: 16, name: 'Chicken Kadhai', price: 330, description: 'Chicken cooked with capsicum and spices delivering bold rich aromatic taste.', image: '/NonVeg/Chicken Kadhai.jpg', ratings: 4.9 }
    ];

    const item = nonVegItems.find(p => p.id === Number(id));

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

export default NonVegDetails;
