import React from "react";
import { CircularTestimonials } from "./ui/circular-testimonials";

const testimonials = [
  {
    quote:
      "I was impressed by the food! And I could really tell that they use high-quality ingredients. The staff was friendly and attentive. I'll definitely be back for more!",
    name: "Aarav Patel",
    designation: "Food Blogger",
    src:
      "https://plus.unsplash.com/premium_photo-1691030256214-dc57034ec935?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    quote:
      "This place exceeded all expectations! The atmosphere is inviting, and the staff truly goes above and beyond. I'll keep returning for more exceptional dining experience.",
    name: "Priya Sharma",
    designation: "Regular Dinner",
    src:
      "https://images.pexels.com/photos/26617600/pexels-photo-26617600.jpeg",
  },
  {
    quote:
      "Shining Yam is a hidden gem! The impeccable service and overall attention to detail created a memorable experience. I highly recommend it!",
    name: "Rohan Gupta",
    designation: "Food Critic",
    src:
      "https://images.pexels.com/photos/3215733/pexels-photo-3215733.jpeg",
  },
  {
    quote:
      "The aesthetic and the taste are just perfect! It’s the perfect spot for weekend hangouts with friends. Love the vibe!",
    name: "Sakshi Singh",
    designation: "Food Enthusiast",
    src: "https://images.pexels.com/photos/12658668/pexels-photo-12658668.jpeg",
  },
];

const CustomerReview = () => {
  return (
    <section className="customer-review-section py-20">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-center text-4xl font-bold" style={{ marginBottom: "40px" }}>What Our Customers Say?</h2>
        <div className="flex flex-wrap gap-6 items-center justify-center relative">
          <div
            className="items-center justify-center relative flex w-full"
            style={{ maxWidth: "1456px", marginBottom: "40px" }}
          >
            <CircularTestimonials
              testimonials={testimonials}
              autoplay={true}
              colors={{
                name: "#0a0a0a",
                designation: "#454545",
                testimony: "#171717",
                arrowBackground: "#141414",
                arrowForeground: "#f1f1f7",
                arrowHoverBackground: "#00A6FB",
              }}
              fontSizes={{
                name: "28px",
                designation: "20px",
                quote: "20px",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomerReview;
