import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  clearCart,
  decreaseQuantity,
  placeOrder,
  removeFromCart,
} from "../store";
import ApplyCoupon from "../components/ApplyCoupon";
import useSendOrderMail from "../hooks/useSendOrderMail";
import { QRCodeCanvas } from "qrcode.react";
import RazorpayCheckout from "../components/RazorpayCheckout";
import { toast } from "react-toastify";
import '../styles/Cart.css';

// MUI
import {
  Card,
  Button,
  Tooltip,
  Divider,
  IconButton,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

function Cart() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const cartItems = useSelector((state) => state.cart.cart);
  const { discount, applied, message } = useSelector((state) => state.coupon);

  const [couponInput, setCouponInput] = useState("");
  const [percentage, setPercentage] = useState(0);
  const [customerEmail, setCustomerEmail] = useState("");
  const [showQR, setShowQR] = useState(false);

  const GST = 18; // %

  const { sendOrderMail } = useSendOrderMail(); // ✅ use hook correctly

  useEffect(() => {
    if (user?.email) setCustomerEmail(user.email);
  }, [user]);

  // TOTALS CALCULATION
  const totalsWithMemo = useMemo(() => {
    const totalAmount = cartItems.reduce(
      (t, item) => t + item.price * item.quantity,
      0
    );
    const discountAmount = (totalAmount * percentage) / 100;
    const priceAfterDiscount = totalAmount - discountAmount;
    const couponAmount = applied ? (priceAfterDiscount * discount) / 100 : 0;
    const netBeforeGST = priceAfterDiscount - couponAmount;
    const gstAmount = (netBeforeGST * GST) / 100;
    const netAmountToPay = netBeforeGST + gstAmount;

    return {
      totalAmount,
      discountAmount,
      priceAfterDiscount,
      couponAmount,
      netBeforeGST,
      gstAmount,
      netAmountToPay,
    };
  }, [cartItems, percentage, applied, discount]);

  const {
    totalAmount,
    discountAmount,
    priceAfterDiscount,
    couponAmount,
    gstAmount,
    netAmountToPay,
  } = totalsWithMemo;

  // UPI LINK
  const upiId = "7667700482@axl";
  const payerName = "Rajnish Rohit";
  const upiLink = `upi://pay?pa=${upiId}&pn=${payerName}&tn=Dessert%20Payment&am=${netAmountToPay.toFixed(
    2
  )}&cu=INR`;

  // HANDLE ORDER AFTER PAYMENT
  const handleCheckout = async () => {
    if (!customerEmail.trim())
      return toast.error("Please enter your email before Checkout!");

    const orderData = {
      items: cartItems,
      totalAmount,
      discountAmount,
      couponAmount,
      netAmountToPay,
      orderDate: new Date(),
      email: customerEmail,
    };

    try {
      const resultAction = await dispatch(placeOrder(orderData));
      if (placeOrder.fulfilled.match(resultAction)) {
        await sendOrderMail({
          customerEmail,
          cartItems,
          percentage,
          totalAmount,
          discountAmount,
          priceAfterDiscount,
          GST,
          gstAmount,
          couponDiscount: applied ? discount : 0, // ✅ pass couponDiscount
          couponAmount,
          netAmountToPay,
        });

        toast.success("Order Placed & Email Sent Successfully!");
        dispatch(clearCart());
      }
    } catch (err) {
      toast.error(`Error: ${err.message}`);
    }
  };

  return (
    <div className="container py-5">
      {cartItems.length === 0 ? (
        <div className="text-center p-5 d-flex flex-column align-items-center justify-content-center">
          <img src="/Desserts/cart.jpg" alt="empty cart" width={250} className="mb-3" />
          <h2 className="mt-3 text-muted">Your Cart is Empty</h2>
          <p className="text-secondary text-lg">Add some items to enjoy delicious food!</p>
        </div>
      ) : (
        <>
          <h1 className="fw-bold text-center mb-4 cart">🛒 Your Cart</h1>

          <div className="row">
            {/* CART ITEMS */}
            <div className="col-md-8">
              {cartItems.map((item) => (
                <Card
                  key={item.id}
                  className="d-flex align-items-center p-3 mb-3 shadow-sm"
                  sx={{ borderRadius: 3 }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ width: 90, height: 90, borderRadius: 10 }}
                  />
                  <div className="ms-3 flex-grow-1">
                    <h5 className="fw-semibold">{item.name}</h5>
                    <p className="text-success fw-bold">₹{item.price.toFixed(2)}</p>
                  </div>

                  <div className="d-flex align-items-center">
                    <IconButton
                      color="error"
                      onClick={() => {
                        dispatch(decreaseQuantity(item));
                        toast.error(`${item.name} Quantity Decreased!`, {
                          position: "top-right",
                          autoClose: 1500,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                        });
                      }}
                    >
                      <RemoveIcon />
                    </IconButton>
                    <span className="fw-bold px-2">{item.quantity}</span>
                    <IconButton
                      color="success"
                      onClick={() => {
                        dispatch(addToCart(item));
                        toast.success(`${item.name} Quantity Increased!`, {
                          position: "top-right",
                          autoClose: 1500,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                        });
                      }}
                    >
                      <AddIcon />
                    </IconButton>
                  </div>

                  <Tooltip title="Remove from Cart" arrow>
                    <IconButton
                      color="error"
                      onClick={() => {
                        dispatch(removeFromCart(item));
                        toast.error(`${item.name} Removed From Cart!`, {
                          position: "top-right",
                          autoClose: 1500,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                        });
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </Card>
              ))}
            </div>

            {/* BILL SUMMARY */}
            <div className="col-md-4">
              <Card className="p-3 shadow-lg" sx={{ borderRadius: 3 }}>
                <h4 className="fw-bold mb-3 text-center">📄 Bill Summary</h4>
                <Divider />

                {/* DISCOUNT SELECTION */}
                <div className="mt-3 text-center">
                  <h6>Apply Discount</h6>
                  {[10, 20, 30].map((p) => (
                    <Button
                      key={p}
                      variant={percentage === p ? "contained" : "outlined"}
                      color="secondary"
                      size="small"
                      className="mx-1 my-1"
                      onClick={() => setPercentage(p)}
                    >
                      {p}% Off
                    </Button>
                  ))}
                </div>

                {/* COUPON */}
                <div className="my-2 text-center">
                  <h6>Apply Coupon</h6>
                  <ApplyCoupon input={couponInput} setInput={setCouponInput} />
                  {message && <p className="text-warning mt-1">{message}</p>}
                </div>

                {/* BILL DETAILS */}
                <div className="mt-3">
                  <div className="d-flex justify-content-between">
                    <span>Total Amount</span>
                    <strong>₹{totalAmount.toFixed(2)}</strong>
                  </div>
                  {percentage > 0 && (
                    <>
                      <div className="d-flex justify-content-between text-danger">
                        <span>Discount ({percentage}%)</span>
                        <strong>- ₹{discountAmount.toFixed(2)}</strong>
                      </div>
                      <div className="d-flex justify-content-between">
                        <span>Price After Discount</span>
                        <strong>₹{priceAfterDiscount.toFixed(2)}</strong>
                      </div>
                    </>
                  )}
                  {applied && (
                    <div className="d-flex justify-content-between text-warning">
                      <span>Coupon Discount</span>
                      <strong>- ₹{couponAmount.toFixed(2)}</strong>
                    </div>
                  )}
                  <div className="d-flex justify-content-between">
                    <span>GST ({GST}%)</span>
                    <strong>₹{gstAmount.toFixed(2)}</strong>
                  </div>

                  <Divider className="my-2" />

                  <div className="d-flex justify-content-between fs-5 fw-bold text-primary">
                    <span>Net Amount</span>
                    <span>₹{netAmountToPay.toFixed(2)}</span>
                  </div>

                  {/* EMAIL */}
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="Enter Email for receipt"
                    size="small"
                    className="mt-3"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                  />

                  {/* RAZORPAY CHECKOUT */}
                  <div className="mt-3">
                    <RazorpayCheckout 
                      amount={netAmountToPay} 
                      click={handleCheckout} 
                      customerEmail={customerEmail} 
                    />
                  </div>

                  {/* UPI */}
                  <Button
                    fullWidth
                    variant="outlined"
                    color="info"
                    className="mt-3"
                    onClick={() => setShowQR(!showQR)}
                  >
                    {showQR ? "Hide UPI QR" : "Show UPI QR"}
                  </Button>

                  {showQR && (
                    <div className="mt-3 text-center">
                      <h6>Scan & Pay (UPI)</h6>
                      <QRCodeCanvas value={upiLink} size={140} />
                    </div>
                  )}
                </div>
              </Card>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;






// import React, { useMemo, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { addToCart, decreaseQuantity, placeOrder, removeFromCart } from '../store';
// import "./Css/Cart.css";
// import ApplyCoupon from "./ApplyCoupon"; 
// import useSendOrderMail from './useSendOrderMail';
// import { QRCodeCanvas } from 'qrcode.react';
// import RazorpayCheckout from './RazorpayCheckout';
// import { toast } from 'react-toastify';


// function Cart() {

//   console.log("🟢 Cart component Rendered");
  
//   const { sendOrderMail } = useSendOrderMail();


//   const cartItems = useSelector(state => state.cart);

//   const [couponInput, setCouponInput] = useState("");

//   const { discount, applied, code, message } = useSelector(state => state.coupon);
//   const dispatch = useDispatch();

//   const [percentage, setPercentage] = useState(0);
//   const [customerEmail, setCustomerEmail] = useState("");

//   const GST = 18;

// // *****************WITHOUT useMemo*************
// //     const totalsWithoutMemo = (() => {
// //       const totalAmount = cartItems.reduce((t, item) => t + item.price * item.quantity, 0);
// //       const discountAmount = (totalAmount * percentage) / 100;
// //       const priceAfterDiscount = totalAmount - discountAmount;
// //       const gstAmount = (priceAfterDiscount * GST) / 100;

// //       console.log("📊 Cart Calculations WITHOUT useMemo:", { totalAmount, discountAmount, priceAfterDiscount, gstAmount });

// //       return { totalAmount, discountAmount, priceAfterDiscount, gstAmount };
// //     })();

// // const { totalAmount, discountAmount, priceAfterDiscount, gstAmount } = totalsWithoutMemo;
// // WITH useMemo

//   const totalsWithMemo = useMemo(() => {
//     const totalAmount = cartItems.reduce((t, item) => t + item.price * item.quantity, 0);
//     const discountAmount = (totalAmount * percentage) / 100;
//     const priceAfterDiscount = totalAmount - discountAmount;
//     const gstAmount = (priceAfterDiscount * GST) / 100;

//     console.log("📊 Cart Calculations WITH useMemo:", { totalAmount, discountAmount, priceAfterDiscount, gstAmount });

//     return { totalAmount, discountAmount, priceAfterDiscount, gstAmount };
//   }, [cartItems, percentage]);

//    const { totalAmount, discountAmount, priceAfterDiscount, gstAmount } = totalsWithMemo;


//   // Coupon calculations 
//   const couponDiscount = applied ? discount : 0;
//   const couponAmount = (totalAmount * couponDiscount) / 100;
//   const netAmountToPay = priceAfterDiscount - couponAmount;

//   // let handleCheckout = () => {
//   //   // Take the Order Details
//   //   const orderData = {
//   //     items : cartItems,
//   //     totalAmount : totalAmount,
//   //     discountAmount : discountAmount,
//   //     couponAmount : couponAmount,
//   //     orderDate : new Date(), // Today's Date
//   //     netAmountToPay : netAmountToPay,
//   //   };

//   const handleCheckout = () => {
//   // Check for email
//   if (!customerEmail.trim()) {
//     return toast.error("Please enter your email before Checkout!", {
//       position: "top-right",
//       autoClose: 2000,
//     });
//   }

//   // Prepare Order Data
//     const orderData = {
//       items: cartItems,
//       totalAmount,
//       discountAmount,
//       couponAmount,
//       netAmountToPay,
//       orderDate: new Date(),
//       email: customerEmail,
//     };

//   // Save Order in DB
//   dispatch(placeOrder(orderData));

//   // Send Email Automatically
//   sendOrderMail({
//     customerEmail,
//     cartItems,
//     percentage,
//     totalAmount,
//     discountAmount,
//     priceAfterDiscount,
//     GST,
//     gstAmount,
//     couponDiscount,
//     couponAmount,
//     netAmountToPay,
//   })
//     .then(() => {
//       toast.success("Order Placed & Email Sent Successfully!", {
//         position: "top-right",
//         autoClose: 2000,
//       });
//     })
//     .catch(() => {
//       toast.error("Order saved, but mail failed!", {
//         position: "top-right",
//         autoClose: 2000,
//       });
//     });
// };


//     // dispatch the Order Details to thunk
//     dispatch(placeOrder(orderData));
//   }


//   // Upi id 
//   const upiId = "7667700482@axl";
//   const payerName = "Rajnish Rohit";

//   const upiLink = `upi://pay?pa=${upiId}&pn=${payerName}&tn=Dessert%20Payment&am=${netAmountToPay.toFixed(2)}&cu=INR`;

//   const [showQR, setShowQR] = useState(false);



//   // Send Email Function
//   // const handleSendMail = () => {
//   //   sendOrderMail({
//   //     customerEmail,
//   //     cartItems,
//   //     percentage,
//   //     totalAmount,
//   //     discountAmount,
//   //     priceAfterDiscount,
//   //     GST,
//   //     gstAmount,
//   //     couponDiscount,
//   //     couponAmount,
//   //     netAmountToPay
//   //   })
//   //   .then(() => alert("Email Sent Successfully"))
//   //   .catch(() => alert("Failed to send email"));
//   // };


//   // Cart item list
//   const listCartItems = cartItems.map(item => (
//     <div key={item.id} className="cart-item">
//       <div className="cart-item-img">
//         <img src={item.image} alt={item.name} />
//       </div>
//       <div className="cart-item-left">
//         <h3>{item.name}</h3>
//         <p className="price">₹{item.price.toFixed(2)}</p>
//       </div>
//       <div className="cart-item-center">
//         <button className="qty-btn" onClick={() =>{ dispatch(decreaseQuantity(item));
//                                                     toast.error(`${item.name} removed from cart!`,
//                                                     {
//                                                         position: "top-right",
//                                                         autoClose: 2000,
//                                                         hideProgressBar: false,
//                                                         closeOnClick: true,
//                                                         pauseOnHover: true,
//                                                         draggable: true,
//                                                         progress: undefined,
//                                                     }
//                                                 );
        
//                                                 }}>−</button>
//         <span className="qty">{item.quantity}</span>
//         <button className="qty-btn" onClick={() =>{ dispatch(addToCart(item));
//                                                     toast.success(`${item.name} quantity increased in cart!`,
//                                                     {
//                                                         position: "top-right",
//                                                         autoClose: 2000,
//                                                         hideProgressBar: false,
//                                                         closeOnClick: true,
//                                                         pauseOnHover: true,
//                                                         draggable: true,
//                                                         progress: undefined,
//                                                     }
//                                                 );
        
//                                                 }}>+</button>
//       </div>
//       <div className="cart-item-right">
//         <button className="remove-btn ms-3" onClick={() =>{ dispatch(removeFromCart(item));
//                                                     toast.error(`${item.name} removed from cart!`,
//                                                     {
//                                                         position: "top-right",
//                                                         autoClose: 2000,
//                                                         hideProgressBar: false,
//                                                         closeOnClick: true,
//                                                         pauseOnHover: true,
//                                                         draggable: true,
//                                                         progress: undefined,
//                                                     }
//                                                 );
        
//                                                 }}>
//           Remove
//         </button>
//       </div>
//     </div>
//   ));

//   return (
//     <div className="cart-container">
//       {cartItems.length === 0 ? (
//         <div className="empty-cart">
//           <img src="/Desserts/cart.jpg" alt="empty cart" />
//           <h2>Your Cart is Empty</h2>
//           <p>Add some items to enjoy delicious food!</p>
//         </div>
//       ) : (
//         <>
//           <h1 className="cart-title">🛒 Your Cart</h1>
//           <div className="cart-grid">

//             {/* LEFT – ITEMS */}
//             <div className="cart-left">
//               <div className="cart-list">
//                 {listCartItems}
//               </div>
//             </div>

//             {/* RIGHT – BILL */}
//             <div className="cart-right text-center">

//               {/* DISCOUNT BUTTONS */}
//               <div className="discount-section">
//                 <h3>Apply Discount</h3>
//                 <div className="discount-buttons">
//                   {[10, 20, 30].map(p => (
//                     <button 
//                       key={p} 
//                       className={percentage === p ? "active" : ""} 
//                       onClick={() => setPercentage(p)}>
//                       {p}% Off
//                     </button>
//                   ))}
//                 </div>

//                 {/* COUPON BOX */}
//                 <div className="coupon-box my-2">
//                   <h3>Apply Coupon</h3>
//                   <ApplyCoupon input={couponInput} setInput={setCouponInput} />
//                 </div>
//                 {message && <p className="coupon-msg">{message}</p>}
//               </div>

//               {/* BILL SUMMARY */}
//               <div className="bill-box">
//                 <h2>Bill Summary</h2>

//                 <div className="bill-row">
//                   <span>Total Amount</span>
//                   <span>₹{totalAmount.toFixed(2)}</span>
//                 </div>

//                 {percentage > 0 && (
//                   <>
//                     <div className="bill-row fade-in">
//                       <span>Discount ({percentage}%)</span>
//                       <span>− ₹{discountAmount.toFixed(2)}</span>
//                     </div>

//                     <div className="bill-row fade-in">
//                       <span>Price After Discount</span>
//                       <span>₹{priceAfterDiscount.toFixed(2)}</span>
//                     </div>
//                   </>
//                 )}

//                 {applied && (
//                   <div className="bill-row fade-in">
//                     <span>Coupon Discount Amount</span>
//                     <span>− ₹{couponAmount.toFixed(2)}</span>
//                   </div>
//                 )}

//                 <div className="bill-row">
//                   <span>GST ({GST}%)</span>
//                   <span>₹{gstAmount.toFixed(2)}</span>
//                 </div>

//                 <hr />

//                 <div className="net-amount">
//                   <span>Net Amount To Pay</span>
//                   <span>₹{netAmountToPay.toFixed(2)}</span>
//                 </div>

//                 {/* EMAIL INPUT */}
//                 <div className="email-box">
//                   <h3>Enter Email to Get Order Receipt</h3>

//                   <input 
//                     className='rounded-2'
//                     type="email"
//                     placeholder="Enter your email"
//                     value={customerEmail}
//                     onChange={(e) => setCustomerEmail(e.target.value)}
//                   />
// {/* 
//                   <button 
//                     className='ms-2 btn btn-outline-primary p-1 rounded-3'
//                     onClick={handleSendMail}
//                   >
//                     Send Email
//                   </button> */}
//                 </div>

//                 {/* <div>
//                   <button onClick={handleCheckout} className='btn btn-outline-success mt-4 w-50'>CheckOut</button>
//                 </div> */}

//                  <div className="flex flex-col items-center mt-10">
//                   <h1 className=" mb-2">Checkout</h1>
//                   <RazorpayCheckout amount={netAmountToPay} click={handleCheckout} />
//                 </div>


//                 {/* UPI QR Code Section */}
//                 <div className="upi-section mt-3">
//                   <button 
//                     className='btn btn-outline-info w-75' 
//                     onClick={() => setShowQR(!showQR)}>
//                     {showQR ? "Hide UPI QR Code" : "Show UPI QR Code"}
//                   </button>

//                   {showQR && (
//                     <div className="qr-code mt-3">
//                       <h3>Pay via UPI</h3>
//                       <h4>Amount to Pay : {netAmountToPay.toFixed(2)}</h4>
//                       <QRCodeCanvas value={upiLink} size={200} />
//                     </div>
//                   )}
//                 </div>

//               </div>

//             </div>

//           </div>
//         </>
//       )}
//     </div>
//   );
// }

// export default Cart;
