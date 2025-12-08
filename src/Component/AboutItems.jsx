import React, { useEffect } from "react";
import "./Css/AboutItems.css";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaLeaf, FaDrumstickBite, FaHamburger, FaCoffee, FaIceCream } from "react-icons/fa";

const itemsData = [
  {
    title: "Veg",
    desc: "Fresh ingredients cooked with authentic Indian spices for the perfect taste.",
    img: "https://t3.ftcdn.net/jpg/17/26/67/08/240_F_1726670887_TpGR7yoRh4pinSqOhVgrZMdB9Y3Rzvni.jpg",
    icon: <FaLeaf />,
    category: "Veg",
    link: "/veg"
  },
  {
    title: "Non-Veg",
    desc: "Authentic chicken dishes cooked with rich flavors and traditional spices.",
    img: "https://t3.ftcdn.net/jpg/06/10/82/10/240_F_610821014_f7Jm2AO7taNJwEIlNDTxCkb4s4thrZlu.jpg",
    icon: <FaDrumstickBite />,
    category: "Non-Veg",
    link: "/nonveg"
  },
  {
    title: "Snacks",
    desc: "Crunchy & delicious snacks to satisfy your taste buds instantly.",
    img: "https://t3.ftcdn.net/jpg/05/89/15/26/240_F_589152619_Ffj66wWOMqlkSyuMG4nhUyAgLcEEDyth.jpg",
    icon: <FaHamburger />,
    category: "Snacks",
    link: "/snack"
  },
  {
    title: "Drinks",
    desc: "Cool, refreshing beverages crafted to boost your energy and mood.",
    img: "https://t3.ftcdn.net/jpg/15/62/36/84/240_F_1562368415_CDXpYCK9SSq8JxrxWIxitC4ALRHICueS.jpg",
    icon: <FaCoffee />,
    category: "Drinks",
    link: "/drink"
  },
  {
    title: "Desserts",
    desc: "Sweet and mouth-watering desserts that melt perfectly in every bite.",
    img: "https://t4.ftcdn.net/jpg/07/73/98/37/240_F_773983742_kNjQ7OATjNVmY8X91vb72F1zqJRKMq5m.jpg",
    icon: <FaIceCream />,
    category: "Desserts",
    link: "/dessert"
  }
];

function AboutItems() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <section id="our-items">
      <div className="container">
        <h2 className="section-title" data-aos="zoom-in">Explore Our Delicious Categories</h2>

        <div className="row justify-content-center">
          {itemsData.map((item, index) => (
            <div className="col-sm-6 col-md-4 col-lg-3 mb-4" key={index}>
                <div className="menu-card text-center p-1 shine-hover" data-aos="fade-up">
                  <div className="category-icon">{item.icon}</div>
                  <img className="about-img rounded-top-3" src={item.img} alt={item.title} />
                  <div className="card-body">
                    <h3 className="item-title">{item.title}</h3>
                    <p className="item-desc">{item.desc}</p>
                    <Link to={item.link} className="text-decoration-none">  
                        <span className="category-badge">{item.category}</span>
                    </Link>
                  </div>
                </div>
              
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default AboutItems;
