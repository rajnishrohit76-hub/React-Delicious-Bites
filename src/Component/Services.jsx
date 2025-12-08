import React, { useEffect, useRef } from "react";
import "./Css/Services.css";

function Services() {
  const cardsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => {
      cardsRef.current.forEach((card) => {
        if (card) observer.unobserve(card);
      });
    };
  }, []);

  const services = [
    { emoji: "🍽️", title: "Dine & Dash In Style", desc: "Chill with friends or grab a solo bite — our cozy vibe and bold flavors make every visit a treat." },
    { emoji: "📲", title: "Click • Grab • Go", desc: "Order online for quick pickup — skip the wait, not the flavor." },
    { emoji: "🚀", title: "Lightning-Fast Delivery", desc: "Boosts your business with our SEO and Marketing strategies." },
    { emoji: "🎉", title: "Party Platters & Catering", desc: "Feeding a crowd? We’ve got you. From office lunches to birthday spreads — we deliver flavor in bulk." },
    { emoji: "📅", title: "Reserve in a Flash", desc: "Book your table online in seconds. Perfect for lunch breaks or weekend plans." },
    { emoji: "🔥", title: "Food Dash — Where Flavor Meets Speed.", desc: "Fresh bites. Fast service. Full satisfaction." },
  ];

  return (
    <div className="services-wrapper mb-4">
      <h2 className="services-heading text-center fw-bold mt-5">Our Services</h2>
      <div className="services-container">
        {services.map((service, index) => (
          <div
            className="services-card"
            key={index}
            ref={(el) => (cardsRef.current[index] = el)}
            style={{ transitionDelay: `${index * 0.2}s` }}
          >
            <div className="services-content">
              <div className="emoji">{service.emoji}</div>
              <h4>{service.title}</h4>
              <p>{service.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Services;
