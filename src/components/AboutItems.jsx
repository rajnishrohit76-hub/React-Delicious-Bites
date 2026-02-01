import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { ThreeDPhotoCarousel } from "./ui/3d-carousel";

const itemsData = [
  {
    title: "Veg",
    desc: "Fresh ingredients cooked with authentic Indian spices for the perfect taste.",
    img: "https://t3.ftcdn.net/jpg/17/26/67/08/240_F_1726670887_TpGR7yoRh4pinSqOhVgrZMdB9Y3Rzvni.jpg",
  },
  {
    title: "Non-Veg",
    desc: "Authentic chicken dishes cooked with rich flavors and traditional spices.",
    img: "https://t3.ftcdn.net/jpg/06/10/82/10/240_F_610821014_f7Jm2AO7taNJwEIlNDTxCkb4s4thrZlu.jpg",
  },
  {
    title: "Snacks",
    desc: "Crunchy & delicious snacks to satisfy your taste buds instantly.",
    img: "https://t3.ftcdn.net/jpg/05/89/15/26/240_F_589152619_Ffj66wWOMqlkSyuMG4nhUyAgLcEEDyth.jpg",
  },
  {
    title: "Drinks",
    desc: "Cool, refreshing beverages crafted to boost your energy and mood.",
    img: "https://t3.ftcdn.net/jpg/15/62/36/84/240_F_1562368415_CDXpYCK9SSq8JxrxWIxitC4ALRHICueS.jpg",
  },
  {
    title: "Desserts",
    desc: "Sweet and mouth-watering desserts that melt perfectly in every bite.",
    img: "https://t4.ftcdn.net/jpg/07/73/98/37/240_F_773983742_kNjQ7OATjNVmY8X91vb72F1zqJRKMq5m.jpg",
  },
  {
    title: "Biryani",
    img: "https://img.freepik.com/free-photo/gourmet-chicken-biryani-with-steamed-basmati-rice-generated-by-ai_188544-13480.jpg",
  },
  {
    title: "Pizza",
    img: "https://img.freepik.com/free-photo/freshly-baked-pizza-rustic-wooden-table-generated-by-ai_24640-82303.jpg",
  },
  {
    title: "Burger",
    img: "https://img.freepik.com/free-photo/tasty-burger-isolated-white-background-fresh-hamburger-fastfood-with-beef-cheese_90220-1063.jpg",
  },
  {
    title: "Pasta",
    img: "https://img.freepik.com/free-photo/penne-pasta-tomato-sauce-with-chicken-tomatoes-wooden-table_2829-19744.jpg",
  },
  {
    title: "Salad",
    img: "https://img.freepik.com/free-photo/fresh-salad-with-vegetables-tomatoes-red-onions-lettuce-quail-eggs-healthy-food-diet-concept-vegetarian-food_2829-20235.jpg",
  },
  {
    title: "Ice Cream",
    img: "https://img.freepik.com/free-photo/ice-cream-cone-flavor-pink-background-summer-sweet-dessert_90220-1368.jpg",
  },
  {
    title: "Mojito",
    img: "https://img.freepik.com/free-photo/fresh-lime-mojito-with-mint-ice-glass-wooden-table_123827-21495.jpg",
  },
  {
    title: "Cake",
    img: "https://img.freepik.com/free-photo/delicious-cake-with-strawberries_144627-43405.jpg",
  },
  {
    title: "Tacos",
    img: "https://img.freepik.com/free-photo/mexican-tacos-with-beef-tomato-sauce-salsa_2829-14226.jpg",
  },
];

function AboutItems() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const carouselImages = itemsData.map(item => item.img);

  return (
    <section id="our-items" className="py-12 overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="text-center fw-bold" data-aos="zoom-in">
          Explore Our Delicious Foods
        </h2>
        <p className="text-center text-gray-600 mb-8 mt-2" data-aos="fade-up">
          Swipe to explore our mouth-watering collection
        </p>

        <div className="w-full relative min-h-[500px]" style={{ marginTop: "18px" }} data-aos="fade-up">
          <ThreeDPhotoCarousel images={carouselImages} />
        </div>
      </div>
    </section>
  );
}

export default AboutItems;
