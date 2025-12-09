import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import api from "../axiosConfig";
import confetti from "canvas-confetti";
import "./Css/RazorpayCheckout.css";

const RazorpayCheckout = ({ amount, click, customerEmail }) => {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const MySwal = withReactContent(Swal);

  const handlePayment = async () => {
    if (!token) {
      alert("You must login first to proceed with payment ❗");
      return navigate("/login");
    }

    if (!customerEmail || !customerEmail.trim()) {
      alert("Please enter your Email before Checkout ❗");
      return;
    }

    try {
      const { data } = await api.post("/payment/create-order", { amount });

      const options = {
        key: "rzp_test_RmFnjlJ3wdbAuJ",
        amount: data.amount,
        currency: data.currency,
        name: "Delicious Bites",
        description: "Payment for your order at Delicious Bites",
        order_id: data.orderId,
        handler: async function (response) {
          try {
            // Verify payment with backend
            const verifyRes = await api.post("/payment/verify-payment", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            if (verifyRes.data.success) {
              // ✅ Await order placement and email sending before showing SweetAlert
              await click(); 

              // 🎉 Confetti effect
              const duration = 2 * 1000;
              const end = Date.now() + duration;
              (function frame() {
                confetti({
                  particleCount: 5,
                  angle: 60,
                  spread: 55,
                  origin: { x: 0 },
                  colors: ["#2980b9", "#27ae60", "#1abc9c", "#16a085"],
                });
                confetti({
                  particleCount: 5,
                  angle: 120,
                  spread: 55,
                  origin: { x: 1 },
                  colors: ["#2980b9", "#27ae60", "#1abc9c", "#16a085"],
                });
                if (Date.now() < end) requestAnimationFrame(frame);
              })();

              // ✅ Show success alert only after order + email is completed
              MySwal.fire({
                title: "<span class='neon-title'>✅ Payment Successful!</span>",
                html: `
                  <p class="neon-text">Your order has been placed successfully.</p>
                  <p class="neon-subtext">Redirecting to your orders page...</p>
                `,
                background: "#f9f9f9",
                showConfirmButton: true,
                confirmButtonText: "Go to Orders",
                customClass: {
                  confirmButton: "swal2-confirm-btn",
                },
                icon: "success",
              }).then(() => {
                navigate("/order");
              });
            } else {
              MySwal.fire({
                title: "<span class='neon-error'>Payment Verification Failed</span>",
                background: "#f9f9f9",
                icon: "error",
                timer: 5000,
                showConfirmButton: true,
              });
            }
          } catch (err) {
            console.error("Verification Error:", err);
            MySwal.fire({
              title: "<span class='neon-error'>Payment Failed</span>",
              text: "Please try again.",
              background: "#f9f9f9",
              icon: "error",
              timer: 5000,
              showConfirmButton: true,
            });
          }
        },
        prefill: {
          name: "Rajnish Rohit",
          email: customerEmail,
          contact: "7667700482",
        },
        notes: {
          address: "Hyderabad, India",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Payment Error:", err);
      MySwal.fire({
        title: "<span class='neon-error'>Payment Failed</span>",
        text: "Please try again.",
        background: "#f9f9f9",
        icon: "error",
        timer: 5000,
        showConfirmButton: true,
      });
    }
  };

  return (
    <div className="checkout-container">
      <h3 className="neon-amount">Total Amount: ₹{amount}</h3>
      <button className="neon-btn" onClick={handlePayment}>
        Checkout
      </button>
    </div>
  );
};

export default RazorpayCheckout;










// import React, { use } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const RazorpayCheckout = ({ amount, click }) => {

//   const navigate = useNavigate();

//   const handlePayment = async () => {
//     try {
//       // 1️⃣ Create Order on Backend
//       const { data } = await axios.post("http://localhost:3000/api/payment/create-order", { amount });

//       const options = {
//         key: "rzp_test_RmFnjlJ3wdbAuJ", // Razorpay Key ID (from .env)
//         amount: data.amount, // in paise
//         currency: data.currency,
//         name: "Food App",
//         description: "Test Transaction",
//         order_id: data.orderId,
//         handler: async function (response) {
//           // 3️⃣ Verify payment on backend
//           const verifyRes = await axios.post("http://localhost:3000/api/payment/verify-payment", {
//             razorpay_order_id: response.razorpay_order_id,
//             razorpay_payment_id: response.razorpay_payment_id,
//             razorpay_signature: response.razorpay_signature,
//           });

//           if (verifyRes.data.success) {
//             alert("Payment Successful ✅");
//             click();
//             navigate("/order");
//           } else {
//             alert("Payment Verification Failed ❌");
//           }
//         }, 
//         prefill: {
//           name: "Rajnish Rohit",
//           email: "rajnishrohit76@gmail.com",
//           contact: "7667700482",
//         },
//         notes: {
//           address: "Hyderabad, India",
//         },
//         theme: {
//           color: "#3399cc",
//         },
//       };

//       const rzp = new window.Razorpay(options);
//       rzp.open();
//     } catch (err) {
//       console.error("Payment Error:", err);
//       alert("Payment Failed. Try Again.");
//     }
//   };

//   return (
//     <>
//       <div>
//         <h3>Total Amount: ₹{amount}</h3>
//         <button onClick={handlePayment} >Checkout</button>
//       </div>
      
//     </>
//   );
// };

// export default RazorpayCheckout;
