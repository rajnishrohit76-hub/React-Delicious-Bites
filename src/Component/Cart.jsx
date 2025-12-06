import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, decreaseQuantity, placeOrder, removeFromCart } from '../store';
import "./Css/Cart.css";
import ApplyCoupon from "./ApplyCoupon"; 
import useSendOrderMail from './useSendOrderMail';
import { QRCodeCanvas } from 'qrcode.react';
import RazorpayCheckout from './RazorpayCheckout';
import { toast } from 'react-toastify';


function Cart() {

  console.log("🟢 Cart component Rendered");
  
  const { sendOrderMail } = useSendOrderMail();


  const cartItems = useSelector(state => state.cart);

  const [couponInput, setCouponInput] = useState("");

  const { discount, applied, code, message } = useSelector(state => state.coupon);
  const dispatch = useDispatch();

  const [percentage, setPercentage] = useState(0);
  const [customerEmail, setCustomerEmail] = useState("");

  const GST = 18;

// *****************WITHOUT useMemo*************
//     const totalsWithoutMemo = (() => {
//       const totalAmount = cartItems.reduce((t, item) => t + item.price * item.quantity, 0);
//       const discountAmount = (totalAmount * percentage) / 100;
//       const priceAfterDiscount = totalAmount - discountAmount;
//       const gstAmount = (priceAfterDiscount * GST) / 100;

//       console.log("📊 Cart Calculations WITHOUT useMemo:", { totalAmount, discountAmount, priceAfterDiscount, gstAmount });

//       return { totalAmount, discountAmount, priceAfterDiscount, gstAmount };
//     })();

// const { totalAmount, discountAmount, priceAfterDiscount, gstAmount } = totalsWithoutMemo;
// WITH useMemo

  const totalsWithMemo = useMemo(() => {
    const totalAmount = cartItems.reduce((t, item) => t + item.price * item.quantity, 0);
    const discountAmount = (totalAmount * percentage) / 100;
    const priceAfterDiscount = totalAmount - discountAmount;
    const gstAmount = (priceAfterDiscount * GST) / 100;

    console.log("📊 Cart Calculations WITH useMemo:", { totalAmount, discountAmount, priceAfterDiscount, gstAmount });

    return { totalAmount, discountAmount, priceAfterDiscount, gstAmount };
  }, [cartItems, percentage]);

   const { totalAmount, discountAmount, priceAfterDiscount, gstAmount } = totalsWithMemo;


  // Coupon calculations 
  const couponDiscount = applied ? discount : 0;
  const couponAmount = (totalAmount * couponDiscount) / 100;
  const netAmountToPay = priceAfterDiscount - couponAmount;

  let handleCheckout = () => {
    // Take the Order Details
    const orderData = {
      items : cartItems,
      totalAmount : totalAmount,
      discountAmount : discountAmount,
      couponAmount : couponAmount,
      orderDate : new Date(), // Today's Date
      netAmountToPay : netAmountToPay,
    };

    // dispatch the Order Details to thunk
    dispatch(placeOrder(orderData));
  }


  // Upi id 
  const upiId = "7667700482@axl";
  const payerName = "Rajnish Rohit";

  const upiLink = `upi://pay?pa=${upiId}&pn=${payerName}&tn=Dessert%20Payment&am=${netAmountToPay.toFixed(2)}&cu=INR`;

  const [showQR, setShowQR] = useState(false);



  // Send Email Function
  const handleSendMail = () => {
    sendOrderMail({
      customerEmail,
      cartItems,
      percentage,
      totalAmount,
      discountAmount,
      priceAfterDiscount,
      GST,
      gstAmount,
      couponDiscount,
      couponAmount,
      netAmountToPay
    })
    .then(() => alert("Email Sent Successfully"))
    .catch(() => alert("Failed to send email"));
  };


  // Cart item list
  const listCartItems = cartItems.map(item => (
    <div key={item.id} className="cart-item">
      <div className="cart-item-img">
        <img src={item.image} alt={item.name} />
      </div>
      <div className="cart-item-left">
        <h3>{item.name}</h3>
        <p className="price">₹{item.price.toFixed(2)}</p>
      </div>
      <div className="cart-item-center">
        <button className="qty-btn" onClick={() =>{ dispatch(decreaseQuantity(item));
                                                    toast.error(`${item.name} removed from cart!`,
                                                    {
                                                        position: "top-right",
                                                        autoClose: 2000,
                                                        hideProgressBar: false,
                                                        closeOnClick: true,
                                                        pauseOnHover: true,
                                                        draggable: true,
                                                        progress: undefined,
                                                    }
                                                );
        
                                                }}>−</button>
        <span className="qty">{item.quantity}</span>
        <button className="qty-btn" onClick={() =>{ dispatch(addToCart(item));
                                                    toast.success(`${item.name} quantity increased in cart!`,
                                                    {
                                                        position: "top-right",
                                                        autoClose: 2000,
                                                        hideProgressBar: false,
                                                        closeOnClick: true,
                                                        pauseOnHover: true,
                                                        draggable: true,
                                                        progress: undefined,
                                                    }
                                                );
        
                                                }}>+</button>
      </div>
      <div className="cart-item-right">
        <button className="remove-btn ms-3" onClick={() =>{ dispatch(removeFromCart(item));
                                                    toast.error(`${item.name} removed from cart!`,
                                                    {
                                                        position: "top-right",
                                                        autoClose: 2000,
                                                        hideProgressBar: false,
                                                        closeOnClick: true,
                                                        pauseOnHover: true,
                                                        draggable: true,
                                                        progress: undefined,
                                                    }
                                                );
        
                                                }}>
          Remove
        </button>
      </div>
    </div>
  ));

  return (
    <div className="cart-container">
      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <img src="/Desserts/cart.jpg" alt="empty cart" />
          <h2>Your Cart is Empty</h2>
          <p>Add some items to enjoy delicious food!</p>
        </div>
      ) : (
        <>
          <h1 className="cart-title">🛒 Your Cart</h1>
          <div className="cart-grid">

            {/* LEFT – ITEMS */}
            <div className="cart-left">
              <div className="cart-list">
                {listCartItems}
              </div>
            </div>

            {/* RIGHT – BILL */}
            <div className="cart-right text-center">

              {/* DISCOUNT BUTTONS */}
              <div className="discount-section">
                <h3>Apply Discount</h3>
                <div className="discount-buttons">
                  {[10, 20, 30].map(p => (
                    <button 
                      key={p} 
                      className={percentage === p ? "active" : ""} 
                      onClick={() => setPercentage(p)}>
                      {p}% Off
                    </button>
                  ))}
                </div>

                {/* COUPON BOX */}
                <div className="coupon-box my-2">
                  <h3>Apply Coupon</h3>
                  <ApplyCoupon input={couponInput} setInput={setCouponInput} />
                </div>
                {message && <p className="coupon-msg">{message}</p>}
              </div>

              {/* BILL SUMMARY */}
              <div className="bill-box">
                <h2>Bill Summary</h2>

                <div className="bill-row">
                  <span>Total Amount</span>
                  <span>₹{totalAmount.toFixed(2)}</span>
                </div>

                {percentage > 0 && (
                  <>
                    <div className="bill-row fade-in">
                      <span>Discount ({percentage}%)</span>
                      <span>− ₹{discountAmount.toFixed(2)}</span>
                    </div>

                    <div className="bill-row fade-in">
                      <span>Price After Discount</span>
                      <span>₹{priceAfterDiscount.toFixed(2)}</span>
                    </div>
                  </>
                )}

                {applied && (
                  <div className="bill-row fade-in">
                    <span>Coupon Discount Amount</span>
                    <span>− ₹{couponAmount.toFixed(2)}</span>
                  </div>
                )}

                <div className="bill-row">
                  <span>GST ({GST}%)</span>
                  <span>₹{gstAmount.toFixed(2)}</span>
                </div>

                <hr />

                <div className="net-amount">
                  <span>Net Amount To Pay</span>
                  <span>₹{netAmountToPay.toFixed(2)}</span>
                </div>

                {/* EMAIL INPUT */}
                <div className="email-box">
                  <h3>Enter Email to Get Order Receipt</h3>

                  <input 
                    className='rounded-2'
                    type="email"
                    placeholder="Enter your email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                  />

                  <button 
                    className='ms-2 btn btn-outline-primary p-1 rounded-3'
                    onClick={handleSendMail}
                  >
                    Send Email
                  </button>
                </div>

                {/* <div>
                  <button onClick={handleCheckout} className='btn btn-outline-success mt-4 w-50'>CheckOut</button>
                </div> */}

                 <div className="flex flex-col items-center mt-10">
                  <h1 className=" mb-2">Checkout</h1>
                  <RazorpayCheckout amount={netAmountToPay} click={handleCheckout} />
                </div>


                {/* UPI QR Code Section */}
                <div className="upi-section mt-3">
                  <button 
                    className='btn btn-outline-info w-75' 
                    onClick={() => setShowQR(!showQR)}>
                    {showQR ? "Hide UPI QR Code" : "Show UPI QR Code"}
                  </button>

                  {showQR && (
                    <div className="qr-code mt-3">
                      <h3>Pay via UPI</h3>
                      <h4>Amount to Pay : {netAmountToPay.toFixed(2)}</h4>
                      <QRCodeCanvas value={upiLink} size={200} />
                    </div>
                  )}
                </div>

              </div>

            </div>

          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
