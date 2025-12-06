import React from "react";
import { Link } from "react-router-dom";
import "./Css/Home.css";

function Home() {

    // ⭐ STATIC CATEGORY DATA
    const categories = [
        {
            id: 1,
            title: "Veg",
            link: "/veg",
            image: "/Veg/Paneer Tikka.avif"
        },
        {
            id: 2,
            title: "Non-Veg",
            link: "/nonveg",
            image: "/NonVeg/Chicken Lolipop.avif"
        },
        {
            id: 3,
            title: "Snack",
            link: "/snack",
            image: "/Snacks/French Fries.avif"
        },
        {
            id: 4,
            title: "Drinks",
            link: "/drink",
            image: "/Drinks/Strawberry Shake.avif"
        },
        {
            id: 5,
            title: "Desserts",
            link: "/dessert",
            image: "/Desserts/Donut.avif"
        }
    ];

    // ⭐ MAP LOGIC
    const renderedCategories = categories.map(cat => (
        <div key={cat.id} className="col-md-4 col-lg-3">
            <Link to={cat.link} className="category-card">
                <img src={cat.image} alt={cat.title} />
                <div className="category-overlay">
                    <h3>{cat.title}</h3>
                </div>
            </Link>
        </div>
    ));

    return (
        <div className="home-container pb-5">

            {/* HERO SECTION */}
            <section className="hero-section d-flex align-items-center justify-content-center text-center">
                <div className="hero-content">
                    <h1 className="hero-title">Delicious Food, Delivered Fresh</h1>
                    <p className="hero-subtitle">
                        Taste the best dishes made with love. Order now & enjoy freshness!
                    </p>

                    <Link to="/veg" className="btn btn-danger btn-lg rounded-pill hero-btn">
                        Explore Menu
                    </Link>
                </div>
            </section>

            {/* CATEGORY SECTION */}
            <section className="container mt-5">
                <h2 className="text-center fw-bold mb-4">Browse by Category</h2>

                <div className="row g-4 justify-content-center">
                    {renderedCategories}
                </div>
            </section>

        </div>
    );
}

export default Home;
