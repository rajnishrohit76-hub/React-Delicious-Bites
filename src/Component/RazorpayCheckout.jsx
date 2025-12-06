import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import api from "../axiosConfig";

const RazorpayCheckout = ({ amount, click }) => {

  const navigate = useNavigate();
  const { token } = useSelector(state => state.auth); // 🔐 Check user login
  const cartItems = useSelector(state => state.cart); // To check cart values
  const customerEmail = useSelector(state => state.user?.email); // If saved user email

  const handlePayment = async () => {

    // 🔴 Validation 1: User must be logged in
    if (!token) {
      alert("You must Login first to proceed for Payment ❗");
      return navigate("/login");
    }

    // 🔴 Validation 2: Email must be entered
    // (Using email from cart page input - passed via function)
    if (!document.querySelector("input[type='email']").value.trim()) {
      alert("Please enter your Email before Checkout ❗");
      return;
    }

    try {
      // 🟢 Create Order on Backend
      const { data } = await api.post("/payment/create-order", { amount });

      const options = {
        key: "rzp_test_RmFnjlJ3wdbAuJ",
        amount: data.amount,
        currency: data.currency,
        name: "Food App",
        description: "Test Transaction",
        order_id: data.orderId,
        handler: async function (response) {

          // 🟢 Verify payment on backend
          const verifyRes = await axios.post("http://localhost:3000/api/payment/verify-payment", {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          });

          if (verifyRes.data.success) {
            alert("Payment Successful ✅");
            click();
            navigate("/order");
          } else {
            alert("Payment Verification Failed ❌");
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
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (err) {
      console.error("Payment Error:", err);
      alert("Payment Failed. Try Again.");
    }
  };

  return (
    <>
      <div>
        <h3>Total Amount: ₹{amount}</h3>
        <button onClick={handlePayment}>Checkout</button>
      </div>

    </>
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
