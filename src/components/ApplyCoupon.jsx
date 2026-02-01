import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { applyCoupon } from "../store";
import "../styles/ApplyCoupn.css";

function ApplyCoupon({ input, setInput }) {
  // const [input, setInput] = useState("");
  const dispatch = useDispatch();

  const handleApply = () => {
    if (input.trim() === "") return;
    dispatch(applyCoupon(input));
  };

  return (
    <div className="coupon-box">
      <input
        type="text"
        className="coupon-input"
        placeholder="Enter Coupon Code"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button className="coupon-btn" onClick={handleApply}>
        Apply
      </button>
    </div>
  );
}

export default ApplyCoupon;
