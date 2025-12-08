import React, { useState, useEffect } from "react";
import "./Css/CustomerReview.css";

const reviews = [
  {
    stars: 5,
    text: "Every bite reminds me of home—authentic and full of flavor!",
    name: "Rajnish",
  },
  {
    stars: 5,
    text: "A perfect fusion of tradition and taste—absolutely delicious!",
    name: "Rohit",
  },
  {
    stars: 4,
    text: "Fresh, flavorful, and made with love—my new favorite spot!",
    name: "Rock",
  },
  {
    stars: 5,
    text: "The spices are spot on—rich, bold, and unforgettable!",
    name: "Sanu",
  },
  {
    stars: 4,
    text: "Tastes just like my grandma used to make—pure comfort food.",
    name: "Ram",
  },
  {
    stars: 5,
    text: "Modern twist on traditional dishes done right. I keep coming back!",
    name: "John Doe",
  },
];

const CustomerReview = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const goPrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? reviews.length - 1 : prev - 1
    );
  };

  const goNext = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  return (
    <section className="customer-review-section">
      <div className="container">
        <h2 className="section-title">What Our Customers Say?</h2>

        <div className="carousel">
          {reviews.map((review, index) => (
            <div
              key={index}
              className={`carousel-item ${
                index === currentIndex ? "active" : ""
              }`}
            >
              <p className="stars">{"⭐️".repeat(review.stars)}</p>
              <p className="review-text">"{review.text}"</p>
              <h3 className="reviewer">- {review.name}</h3>
            </div>
          ))}

          <button className="carousel-btn prev" onClick={goPrev}>
            &#10094;
          </button>
          <button className="carousel-btn next" onClick={goNext}>
            &#10095;
          </button>
        </div>
      </div>
    </section>
  );
};

export default CustomerReview;
