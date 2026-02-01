import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";
import AboutItems from "../components/AboutItems";
import PopularDishes from "../components/PopularDishes";
import Services from "../components/Services";
import CustomerReview from "../components/CustomerReview";
import { ArcGalleryHero } from "../components/ui/ArcGalleryHero";

function Home() {
    const heroImages = [
        "https://t4.ftcdn.net/jpg/06/85/20/81/240_F_685208138_RHffbbg1ALT5PEScJxSsH0bBxQp97V1Y.jpg",
        "https://t4.ftcdn.net/jpg/08/22/27/53/240_F_822275321_Furo4rcWaOhgjFYyjLeJ0REg46dmMPNd.jpg",
        "https://t3.ftcdn.net/jpg/15/55/51/30/240_F_1555513051_Ja9YEYRSV1xwJiCrNQxUBDW3ySUF6109.jpg"
    ];

    // ⭐ STATIC CATEGORY DATA
    const categories = [
        {
            id: 1,
            title: "Veg",
            link: "/veg",
            image: "https://t4.ftcdn.net/jpg/08/22/27/53/240_F_822275321_Furo4rcWaOhgjFYyjLeJ0REg46dmMPNd.jpg"
        },
        {
            id: 2,
            title: "Non-Veg",
            link: "/nonveg",
            image: "https://t3.ftcdn.net/jpg/15/55/51/30/240_F_1555513051_Ja9YEYRSV1xwJiCrNQxUBDW3ySUF6109.jpg"
        },
        {
            id: 3,
            title: "Snack",
            link: "/snack",
            image: "https://t3.ftcdn.net/jpg/05/89/15/26/240_F_589152619_Ffj66wWOMqlkSyuMG4nhUyAgLcEEDyth.jpg"
        },
        {
            id: 4,
            title: "Drinks",
            link: "/drink",
            image: "https://t4.ftcdn.net/jpg/06/23/78/99/240_F_623789950_aAIp3ejFuGQcVOgU0gHaRQYcu02hjCOr.jpg"
        },
        {
            id: 5,
            title: "Desserts",
            link: "/dessert",
            image: "https://t3.ftcdn.net/jpg/14/60/37/18/240_F_1460371846_ZEDxY9wOb7nW5iYf71ItsTi8LHuUePZW.jpg"
        }
    ];

    const allImages = [...heroImages, ...categories.map(c => c.image)];

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
        <div className="home-container">
            {/* HERO SECTION */}
            <section className="mb-5">
                <ArcGalleryHero images={allImages} />
            </section>

            {/* CATEGORY SECTION */}
            <section className="container">
                <h2 className="text-center fw-bold">Browse by Category</h2>
                <div className="row g-4 justify-content-center mt-2">
                    {renderedCategories}
                </div>
            </section>

            <section id="about-items" style={{ marginTop: "60px" }}>
                <div>
                    <AboutItems />
                </div>
            </section>

            <section id="popular" className="mt-10">
                <div className="popular">
                    <PopularDishes />
                </div>
            </section>

            <div>
                <Services />
            </div>

            <div>
                <CustomerReview />
            </div>
        </div>
    );
}

export default Home;
