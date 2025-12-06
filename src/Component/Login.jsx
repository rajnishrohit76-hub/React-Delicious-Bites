import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { loginUser } from "../store";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, token } = useSelector((state) => state.auth);

  // ⭐ React Hook Form with Error Validation
  const {
    register,
    handleSubmit,
    formState: { errors },  // 👈 access errors
  } = useForm();

  const onSubmit = (data) => {
    dispatch(loginUser(data));
  };

  useEffect(() => {
    if (token) navigate("/home");
  }, [token, navigate]);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-3">Sign In</h2>

      {error && <p className="text-danger text-center">{error}</p>}

      <form onSubmit={handleSubmit(onSubmit)} className="w-50 mx-auto">

        {/* 📧 Email Field */}
        <input
          type="email"
          placeholder="Email"
          className="form-control mb-1"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email format",
            },
          })}
        />
        {errors.email && (
          <p className="text-danger small mb-2">{errors.email.message}</p>
        )}

        {/* 🔐 Password Field */}
        <input
          type="password"
          placeholder="Password"
          className="form-control mb-1"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 4,
              message: "Password must be at least 4 characters",
            },
          })}
        />
        {errors.password && (
          <p className="text-danger small mb-2">{errors.password.message}</p>
        )}

        <button
          type="submit"
          className="btn btn-success w-100 mt-2"
          disabled={loading}
        >
          {loading ? "Signing in..." : "Login"}
        </button>
      </form>

      {/* 🔗 Redirect Link */}
      <p className="text-center mt-3">
        Don’t have an account?
        <span
          className="text-primary"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/register")}
        >
          {" "}Create Account
        </span>
      </p>
    </div>
  );
};

export default Login;




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
