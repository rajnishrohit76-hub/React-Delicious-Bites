import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../store";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import "./Css/Register.css";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { loading, error, token } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    watch,
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

    delete data.confirmPassword;

    dispatch(registerUser(data));
  };

  useEffect(() => {
    if (token) navigate("/home");
  }, [token, navigate]);

  return (
    <div className="login-page">
      <div className="ring" key={location.pathname}>
        <i style={{ "--clr": "#00ff0a" }}></i>
        <i style={{ "--clr": "#ff0057" }}></i>
        <i style={{ "--clr": "#fffd44" }}></i>

        <div className="login">
          <h2>Create Account</h2>

          {error && <p className="text-danger">{error}</p>}

          <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
            <div className="inputBx">
              <input
                placeholder="Full Name"
                {...register("name", { required: "Name is required" })}
              />
            </div>
            {errors.name && <p className="text-danger">{errors.name.message}</p>}

            <div className="inputBx">
              <input
                type="email"
                placeholder="Email"
                {...register("email", {
                  required: "Email is required",
                  pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
                })}
              />
            </div>
            {errors.email && <p className="text-danger">{errors.email.message}</p>}

            <div className="inputBx">
              <input
                type="password"
                placeholder="Password"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Min 6 characters" },
                })}
              />
            </div>
            {errors.password && <p className="text-danger">{errors.password.message}</p>}

            <div className="inputBx">
              <input
                type="password"
                placeholder="Confirm Password"
                {...register("confirmPassword", { required: "Confirm your password" })}
                onBlur={handleConfirmPasswordBlur}
              />
            </div>
            {passwordMatchError && <p className="text-danger">{passwordMatchError}</p>}

            <div className="inputBx">
              <input
                placeholder="Phone Number"
                {...register("phone", {
                  required: "Phone number is required",
                  pattern: { value: /^[0-9]{10}$/, message: "Enter valid 10-digit number" },
                })}
              />
            </div>
            {errors.phone && <p className="text-danger">{errors.phone.message}</p>}

            <div className="inputBx">
              <input
                placeholder="Address"
                {...register("address", { required: "Address is required", minLength: { value: 5, message: "Min 5 characters" } })}
              />
            </div>
            {errors.address && <p className="text-danger">{errors.address.message}</p>}

            <div className="inputBx">
              <select {...register("gender", { required: "Gender is required" })}>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            {errors.gender && <p className="text-danger">{errors.gender.message}</p>}

            <div className="inputBx">
              <select {...register("country", { required: "Country is required" })}>
                <option value="">Select Country</option>
                <option value="India">India</option>
                <option value="USA">USA</option>
                <option value="UK">UK</option>
                <option value="Canada">Canada</option>
              </select>
            </div>
            {errors.country && <p className="text-danger">{errors.country.message}</p>}

            <div className="inputBx">
              <input type="submit" value={loading ? "Creating..." : "Register"} disabled={loading} />
            </div>
          </form>

          <div className="links">
            <a onClick={() => navigate("/login")} style={{ cursor: "pointer" }}>
              Already have an account? Sign In
            </a>
          </div>
        </div>
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
