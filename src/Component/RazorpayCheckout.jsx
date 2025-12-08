import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import api from "../axiosConfig";
import "./Css/RazorpayCheckout.css"; // optional CSS for animation

const RazorpayCheckout = ({ amount, click }) => {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const customerEmail = useSelector((state) => state.user?.email);

  const MySwal = withReactContent(Swal);

  const handlePayment = async () => {
    if (!token) {
      alert("You must Login first to proceed for Payment ❗");
      return navigate("/login");
    }

    if (!document.querySelector("input[type='email']").value.trim()) {
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
          const verifyRes = await api.post("/payment/verify-payment", {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          });

          if (verifyRes.data.success) {
            // Neon SweetAlert2
            MySwal.fire({
              title: "<span class='neon-title'>Order Placed Successfully!</span>",
              html: "<p class='neon-text'>Redirecting to your orders page...</p>",
              background: "#0a0a0a",
              timer: 10000,
              timerProgressBar: true,
              showConfirmButton: false,
              didOpen: () => Swal.showLoading(),
            });

            click();

            setTimeout(() => {
              navigate("/order");
            }, 10000);
          } else {
            MySwal.fire({
              title: "<span class='neon-error'>Payment Verification Failed</span>",
              background: "#0a0a0a",
              icon: "error",
              timer: 5000,
              showConfirmButton: true,
            });
          }
        },
        prefill: {
          name: "Rajnish Rohit",
          email: customerEmail || "user@gmail.com",
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
        background: "#0a0a0a",
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
