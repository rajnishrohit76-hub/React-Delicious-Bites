import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { loginUser } from "../store";
import "./Css/Login.css";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { loading, error, token } = useSelector((state) => state.auth);

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    dispatch(loginUser(data));
  };

  // Redirect when logged in
  useEffect(() => {
    if (token) navigate("/cart");
  }, [token, navigate]);

  return (
    <div className="login-page">
      <div className="ring" key={location.pathname}>
        <i style={{ "--clr": "#00ff0a" }}></i>
        <i style={{ "--clr": "#ff0057" }}></i>
        <i style={{ "--clr": "#fffd44" }}></i>

        <div className="login">
          <h2>Login</h2>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
            
            {/* Email */}
            <div className="inputBx">
              <input
                type="email"
                placeholder="Email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email format",
                  },
                })}
              />
            </div>
            {errors.email && (
              <p className="text-danger small" style={{ color: "red" }}>
                {errors.email.message}
              </p>
            )}

            {/* Password */}
            <div className="inputBx">
              <input
                type="password"
                placeholder="Password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 4,
                    message: "Minimum 4 characters required",
                  },
                })}
              />
            </div>
            {errors.password && (
              <p className="text-danger small" style={{ color: "red" }}>
                {errors.password.message}
              </p>
            )}

            {/* API Error */}
            {error && (
              <p style={{ color: "red", fontSize: "14px" }}>{error}</p>
            )}

            {/* Submit */}
            <div className="inputBx">
              <input
                type="submit"
                value={loading ? "Signing in..." : "Sign In"}
                disabled={loading}
              />
            </div>
          </form>

          {/* Links */}
          <div className="links">
            <a onClick={() => navigate("/login")} style={{ cursor: "pointer" }}>
              Forget Password
            </a>
            <a onClick={() => navigate("/register")} style={{ cursor: "pointer" }}>
              Signup
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;






// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import { loginUser } from "../store";

// const Login = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { loading, error, token } = useSelector((state) => state.auth);

//   // ⭐ React Hook Form with Error Validation
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },  // 👈 access errors
//   } = useForm();

//   const onSubmit = (data) => {
//     dispatch(loginUser(data));
//   };

//   useEffect(() => {
//     if (token) navigate("/cart");
//   }, [token, navigate]);

//   return (
//     <div className="container mt-5">
//       <h2 className="text-center mb-3">Sign In</h2>

//       {error && <p className="text-danger text-center">{error}</p>}

//       <form onSubmit={handleSubmit(onSubmit)} className="w-50 mx-auto">

//         {/* 📧 Email Field */}
//         <input
//           type="email"
//           placeholder="Email"
//           className="form-control mb-1"
//           {...register("email", {
//             required: "Email is required",
//             pattern: {
//               value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
//               message: "Invalid email format",
//             },
//           })}
//         />
//         {errors.email && (
//           <p className="text-danger small mb-2">{errors.email.message}</p>
//         )}

//         {/* 🔐 Password Field */}
//         <input
//           type="password"
//           placeholder="Password"
//           className="form-control mb-1"
//           {...register("password", {
//             required: "Password is required",
//             minLength: {
//               value: 4,
//               message: "Password must be at least 4 characters",
//             },
//           })}
//         />
//         {errors.password && (
//           <p className="text-danger small mb-2">{errors.password.message}</p>
//         )}

//         <button
//           type="submit"
//           className="btn btn-success w-100 mt-2"
//           disabled={loading}
//         >
//           {loading ? "Signing in..." : "Login"}
//         </button>
//       </form>

//       {/* 🔗 Redirect Link */}
//       <p className="text-center mt-3">
//         Don’t have an account?
//         <span
//           className="text-primary"
//           style={{ cursor: "pointer" }}
//           onClick={() => navigate("/register")}
//         >
//           {" "}Create Account
//         </span>
//       </p>
//     </div>
//   );
// };

// export default Login;




// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { loginUser } from "../store";

// const Login = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { loading, error, token } = useSelector((state) => state.auth);

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch(loginUser({ email, password }));
//   };

//   // Redirect when login success
//   useEffect(() => {
//     if (token) {
//       navigate("/home");
//     }
//   }, [token, navigate]);

//   return (
//     <div className="container mt-5">
//       <h2 className="text-center mb-3">Sign In</h2>

//       {error && <p className="text-danger text-center">{error}</p>}

//       <form onSubmit={handleSubmit} className="w-50 mx-auto">
//         <input
//           type="email"
//           placeholder="Email"
//           className="form-control mb-3"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           className="form-control mb-3"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />

//         <button type="submit" className="btn btn-success w-100" disabled={loading}>
//           {loading ? "Signing in..." : "Login"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Login;
