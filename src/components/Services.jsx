import React, { useState, useEffect } from "react";
import { GlowCard } from "./ui/spotlight-card";
import "../styles/Services.css"; // Keeping if needed for other styles, but mainly using Tailwind now

function Services() {
  const services = [
    { emoji: "🍽️", title: "Dine & Dash In Style", desc: "Chill with friends or grab a solo bite — our cozy vibe and bold flavors make every visit a treat." },
    { emoji: "📲", title: "Click • Grab • Go", desc: "Order online for quick pickup — skip the wait, not the flavor." },
    { emoji: "🚀", title: "Lightning-Fast Delivery", desc: "Boosts your business with our SEO and Marketing strategies." },
    { emoji: "🎉", title: "Party Platters & Catering", desc: "Feeding a crowd? We’ve got you. From office lunches to birthday spreads — we deliver flavor in bulk." },
    { emoji: "📅", title: "Reserve in a Flash", desc: "Book your table online in seconds. Perfect for lunch breaks or weekend plans." },
    { emoji: "🔥", title: "Food Dash — Where Flavor Meets Speed.", desc: "Fresh bites. Fast service. Full satisfaction." },
  ];

  const colors = ["blue", "purple", "green", "red", "orange"];
  const [colorIndices, setColorIndices] = useState(services.map((_, i) => i % colors.length));

  useEffect(() => {
    const interval = setInterval(() => {
      setColorIndices((prevIndices) =>
        prevIndices.map((index) => (index + 1) % colors.length)
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleHover = (index) => {
    setColorIndices((prevIndices) => {
      const newIndices = [...prevIndices];
      newIndices[index] = (newIndices[index] + 1) % colors.length;
      return newIndices;
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-8" style={{ marginBottom: "40px", marginTop: "40px" }}>
      <h2 className="text-center text-2xl font-bold mt-10 mb-8">Our Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-4">
        {services.map((service, index) => (
          <div key={index} onMouseEnter={() => handleHover(index)} className="h-full">
            <GlowCard
              className="flex flex-col items-start justify-start w-full h-full bg-white dark:bg-black/40"
              glowColor={colors[colorIndices[index]]}
              customSize={true}
            >
              <div className="flex flex-col gap-2 z-10 w-full h-full">
                <div className="text-4xl">{service.emoji}</div>
                <h4 className="text-xs font-bold text-gray-900 dark:text-white mt-2">
                  {service.title}
                </h4>
                <p className="text-md text-gray-600 dark:text-gray-300 leading-relaxed">
                  {service.desc}
                </p>
              </div>
            </GlowCard>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Services;
