import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllOrders } from "../store";
import "./Order.css";

function Order() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllOrders());
  }, [dispatch]);

  const { orders, loading, error } = useSelector((state) => state.getOrders);

  return (
    <div className="order-wrapper">
      <h2 className="order-title">My Orders</h2>

      {loading && <p className="center-text">Fetching orders... 🍽️</p>}
      {error && <p className="center-text error-text">Error: {error}</p>}

      <div className="order-list">
        {Array.isArray(orders) && orders.length > 0 ? (
          orders.map(order => (
            <div key={order._id} className="order-row">

              {/* Order ID + Date */}
              <div className="order-info-box">
                <p className="order-id">Order ID: <b>#{order._id.slice(-8)}</b></p>
                <p className="order-date">
                  📅 {new Date(order.orderDate).toLocaleDateString()}  
                  {" | " + new Date(order.orderDate).toLocaleTimeString()}
                </p>
              </div>

              {/* Price Summary */}
              <div className="order-price-details">
                <p><span>Total:</span> ₹{order.totalAmount}</p>
                {order.discountAmount > 0 && <p><span>Discount:</span> -₹{order.discountAmount}</p>}
                {order.couponAmount > 0 && <p><span>Coupon:</span> -₹{order.couponAmount}</p>}
                <p className="final-amount"><span>Final:</span> ₹{order.netAmountToPay}</p>
              </div>

              {/* Status + Button */}
              <div className="order-status-box">
                <span className="status-label delivered">Delivered</span>
                <button className="reorder-btn">Reorder</button>
              </div>

            </div>
          ))
        ) : (
          !loading && (
            <p className="center-text empty-message">
              No orders yet 😢 <br /> Start ordering your favourites 🍕🍔
            </p>
          )
        )}
      </div>
    </div>
  );
}

export default Order;





// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchAllOrders } from "../store";
// import "./Order.css";

// function Order() {
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(fetchAllOrders());
//   }, [dispatch]);

//   const { orders, loading, error } = useSelector((state) => state.getOrders);

//   return (
//     <div className="order-container">
//       <h2 className="order-heading">My Orders</h2>

//       {loading && <p className="center-text">Fetching your orders... 🍽️</p>}
//       {error && <p className="center-text error-text">Error: {error}</p>}

//       <div className="orders-grid">
//         {Array.isArray(orders) && orders.length > 0 ? (
//           orders.map((order) => (
//             <div key={order._id} className="order-card">

//               {/* Order Header */}
//               <div className="order-top">
//                 <span className="order-id">#{order._id.slice(-6)}</span>
//                 <span className="order-date">
//                   📅 {order.orderDate ? new Date(order.orderDate).toLocaleDateString() : "Unknown"}
//                 </span>
//               </div>

//               {/* Order Timeline */}
//               <div className="order-status">
//                 <div className="track-step completed">Placed</div>
//                 <div className="track-line completed"></div>
//                 <div className="track-step completed">Preparing</div>
//                 <div className="track-line completed"></div>
//                 <div className="track-step completed">Out for Delivery</div>
//                 <div className="track-line completed"></div>
//                 <div className="track-step completed">Delivered</div>
//               </div>

//               <hr />

//               {/* Ordered Items */}
//               <div className="order-items">
//                 {order.items?.map((item, i) => (
//                   <div key={i} className="item-card-box">
//                     <div className="item-image-box">
//                       <img src={item.image} alt={item.name} />
//                     </div>
//                     <div className="item-info">
//                       <p className="item-name">
//                         {item.name}{" "}
//                         <span className={`veg-nonveg-icon ${item.isVeg ? "veg" : "nonveg"}`}></span>
//                       </p>
//                       <p className="item-price">₹{item.price}</p>
//                     </div>
//                     <div className="item-qty-badge">x{item.qty || 1}</div>
//                   </div>
//                 ))}
//               </div>

//               <hr />

//               {/* Price Section */}
//               <div className="price-section">
//                 <div><span>Total</span><span>₹{order.totalAmount}</span></div>
//                 {order.discountAmount > 0 && <div><span>Discount</span><span>₹{order.discountAmount}</span></div>}
//                 {order.couponAmount > 0 && <div><span>Coupon</span><span>₹{order.couponAmount}</span></div>}
//                 <div className="payable"><span>Final Amount</span><span>₹{order.netAmountToPay}</span></div>
//               </div>

//               <button className="reorder-btn">Reorder</button>

//               <div className="delivery-note">🛵 Delivered Successfully</div>
//             </div>
//           ))
//         ) : (
//           !loading && (
//             <p className="center-text empty-msg">
//               No orders yet 😢 <br />
//               Start ordering your favorites 🍕🍔
//             </p>
//           )
//         )}
//       </div>
//     </div>
//   );
// }

// export default Order;
