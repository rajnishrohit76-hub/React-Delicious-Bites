import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../store";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, token } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    trigger,
    formState: { errors },
  } = useForm();

  const [passwordMatchError, setPasswordMatchError] = useState("");

  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  const handleConfirmPasswordBlur = () => {
    if (password !== confirmPassword) {
      setPasswordMatchError("Password does not match");
    } else {
      setPasswordMatchError("");
    }
  };

  const onSubmit = async (data) => {
    if (password !== confirmPassword) {
      setPasswordMatchError("Password does not match");
      return;
    }

    data.hobbies = Object.keys(data.hobbies || {}).filter(
      (key) => data.hobbies[key]
    );

    delete data.confirmPassword; // Don't send confirmPassword to backend

    dispatch(registerUser(data));
    reset();
  };

  useEffect(() => {
    if (token) navigate("/home");
  }, [token, navigate]);

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="card shadow p-4" style={{ width: "450px" }}>
        <h3 className="text-center mb-3">Create Account</h3>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Name */}
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input
              className="form-control"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && <small className="text-danger">{errors.name.message}</small>}
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email format",
                },
              })}
            />
            {errors.email && <small className="text-danger">{errors.email.message}</small>}
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Min 6 characters" },
              })}
              onBlur={() => trigger("password")}
            />
            {errors.password && <small className="text-danger">{errors.password.message}</small>}
          </div>

          {/* Confirm Password */}
          <div className="mb-3">
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              {...register("confirmPassword", {
                required: "Confirm your password",
              })}
              onBlur={handleConfirmPasswordBlur}
            />
            {passwordMatchError && (
              <small className="text-danger">{passwordMatchError}</small>
            )}
          </div>

          {/* Phone */}
          <div className="mb-3">
            <label className="form-label">Phone Number</label>
            <input
              className="form-control"
              {...register("phone", {
                required: "Phone number is required",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Enter a valid 10-digit mobile number",
                },
              })}
            />
            {errors.phone && <small className="text-danger">{errors.phone.message}</small>}
          </div>

          {/* Address */}
          <div className="mb-3">
            <label className="form-label">Address</label>
            <textarea
              rows="2"
              className="form-control"
              {...register("address", {
                required: "Address is required",
                minLength: { value: 5, message: "Min 5 characters" },
              })}
            ></textarea>
            {errors.address && <small className="text-danger">{errors.address.message}</small>}
          </div>

          {/* Gender */}
          <div className="mb-3">
            <label className="form-label">Gender</label>
            <select
              className="form-select"
              {...register("gender", { required: "Gender is required" })}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {errors.gender && <small className="text-danger">{errors.gender.message}</small>}
          </div>

          {/* Hobbies */}
          <div className="mb-3">
            <label className="form-label">Hobbies</label>
            {["Reading", "Sports", "Travelling", "Cooking"].map((hobby) => (
              <div className="form-check" key={hobby}>
                <input
                  type="checkbox"
                  className="form-check-input"
                  {...register(`hobbies.${hobby}`)}
                />
                <label className="form-check-label">{hobby}</label>
              </div>
            ))}
          </div>

          {/* Country */}
          <div className="mb-3">
            <label className="form-label">Country</label>
            <select
              className="form-select"
              {...register("country", { required: "Country is required" })}
            >
              <option value="">Select Country</option>
              <option value="India">India</option>
              <option value="USA">USA</option>
              <option value="UK">UK</option>
              <option value="Canada">Canada</option>
            </select>
            {errors.country && <small className="text-danger">{errors.country.message}</small>}
          </div>

          {/* Submit */}
          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? "Creating Account..." : "Register"}
          </button>

          <button
            type="button"
            className="btn btn-secondary w-100 mt-2"
            onClick={() => reset()}
          >
            Reset
          </button>
        </form>

        <p className="mt-3 text-center">
          Already have an account?{" "}
          <span className="text-primary" style={{ cursor: "pointer" }} onClick={() => navigate("/login")}>
            Sign In
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;




// ===========================================================================================================================








// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { registerUser } from "../store";
// import { useNavigate } from "react-router-dom";
// import { useForm } from "react-hook-form";

// const Register = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { loading, error, token } = useSelector((state) => state.auth);

//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm();

//   const onSubmit = (data) => {
//     dispatch(registerUser(data));
//     reset();
//   };

//   useEffect(() => {
//     if (token) navigate("/home");
//   }, [token, navigate]);

//   return (
//     <div className="container mt-5">
//       <h2 className="text-center mb-3">Create Account</h2>
//       {error && <p className="text-danger text-center">{error}</p>}

//       <form className="w-50 mx-auto" onSubmit={handleSubmit(onSubmit)}>
        
//         {/* Full Name */}
//         <input
//           className="form-control mb-2"
//           placeholder="Full Name"
//           {...register("name", { required: "Name is required" })}
//         />
//         {errors.name && <span className="text-danger">{errors.name.message}</span>}

//         {/* Email */}
//         <input
//           className="form-control mb-2"
//           type="email"
//           placeholder="Email"
//           {...register("email", {
//             required: "Email is required",
//             pattern: {
//               value: /^\S+@\S+$/i,
//               message: "Invalid email format",
//             },
//           })}
//         />
//         {errors.email && <span className="text-danger">{errors.email.message}</span>}

//         {/* Password */}
//         <input
//           className="form-control mb-2"
//           type="password"
//           placeholder="Password"
//           {...register("password", {
//             required: "Password is required",
//             minLength: {
//               value: 6,
//               message: "Minimum 6 characters required",
//             },
//           })}
//         />
//         {errors.password && <span className="text-danger">{errors.password.message}</span>}

//         {/* Phone */}
//         <input
//           className="form-control mb-2"
//           placeholder="Phone Number"
//           {...register("phone", {
//             required: "Phone number is required",
//             pattern: {
//               value: /^[0-9]{10}$/,
//               message: "Enter a valid 10-digit mobile number",
//             },
//           })}
//         />
//         {errors.phone && <span className="text-danger">{errors.phone.message}</span>}

//         {/* Address */}
//         <textarea
//           className="form-control mb-2"
//           placeholder="Full Address"
//           rows="3"
//           {...register("address", {
//             required: "Address is required",
//             minLength: {
//               value: 5,
//               message: "Address must be at least 5 characters",
//             },
//           })}
//         />
//         {errors.address && <span className="text-danger">{errors.address.message}</span>}

//         {/* Submit Button */}
//         <button className="btn btn-primary w-100" disabled={loading}>
//           {loading ? "Creating Account..." : "Register"}
//         </button>

//         {/* Reset Button */}
//         <button
//           type="button"
//           className="btn btn-secondary w-100 mt-2"
//           onClick={() => reset()}
//         >
//           Reset
//         </button>

//         <p className="text-center mt-3">
//           Already have an account?{" "}
//           <span
//             className="text-primary"
//             style={{ cursor: "pointer" }}
//             onClick={() => navigate("/login")}
//           >
//             Sign In
//           </span>
//         </p>
//       </form>
//     </div>
//   );
// };

// export default Register;


// =====================================








// ==========================================================================================================






// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { registerUser } from "../store";
// import { useNavigate } from "react-router-dom";

// const Register = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { loading, error, token } = useSelector((state) => state.auth);

//   const [form, setForm] = useState({ name: "", email: "", password: "" });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch(registerUser(form));
//   };

//   useEffect(() => {
//     if (token) navigate("/home");
//   }, [token, navigate]);

//   return (
//     <div className="container mt-5">
//       <h2 className="text-center mb-3">Create Account</h2>
//       {error && <p className="text-danger text-center">{error}</p>}

//       <form className="w-50 mx-auto" onSubmit={handleSubmit}>
//         <input className="form-control mb-3" placeholder="Full Name"
//           value={form.name}
//           onChange={(e) => setForm({ ...form, name: e.target.value })}
//           required />

//         <input className="form-control mb-3" type="email" placeholder="Email"
//           value={form.email}
//           onChange={(e) => setForm({ ...form, email: e.target.value })}
//           required />

//         <input className="form-control mb-3" type="password" placeholder="Password"
//           value={form.password}
//           onChange={(e) => setForm({ ...form, password: e.target.value })}
//           required />

//         <button className="btn btn-primary w-100" disabled={loading}>
//           {loading ? "Creating Account..." : "Register"}
//         </button>

//         <p className="text-center mt-3">
//           Already have an account?
//           <span className="text-primary" style={{ cursor: "pointer" }} onClick={() => navigate("/login")}>
//             {" "}Sign In
//           </span>
//         </p>
//       </form>
//     </div>
//   );
// };

// export default Register;
