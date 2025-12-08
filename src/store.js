import { configureStore, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { couponCode } from './Component/coupon';
import { jwtDecode } from "jwt-decode"; // 🔹 Correct import
import { use } from 'react';
import api from './axiosConfig';

// =====================
// Auto-Logout Feature
// =====================
let logoutTimer = null;

export const setLogoutTimer = (dispatch, token) => {
  if (!token) return;

  // Clear old timer
  if (logoutTimer) clearTimeout(logoutTimer);

  let decoded;
  try {
    decoded = jwtDecode(token);
  } catch (err) {
    console.error("Invalid token:", err);
    dispatch(logout());
    return;
  }

  const expireTime = decoded.exp * 1000; // Convert to ms
  const remainingTime = expireTime - Date.now();

  console.log("⏳ Remaining:", remainingTime / 1000, "seconds");

  if (remainingTime <= 0) {
    dispatch(logout());
    return;
  }

  logoutTimer = setTimeout(() => {
    console.log("🔁 Token expired -> Auto Logout");
    dispatch(logout());
  }, remainingTime);
};


// =====================
// Product Thunks
// =====================
export const fetchVegProducts = createAsyncThunk(
  "products/fetchVegProducts",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/product/veg");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Error fetching veg products");
    }
  }
);

export const fetchNonVegProducts = createAsyncThunk(
  "products/fetchNonVegProducts",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/product/nonveg");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Error fetching non-veg products");
    }
  }
);

export const fetchSnackProducts = createAsyncThunk(
  "products/fetchSnackProducts",
  async (_, { rejectWithValue }) => { 
    try {
      const res = await api.get("/product/snacks");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Error fetching snack products");
    }
  }
);

export const fetchDrinkProducts = createAsyncThunk(
  "products/fetchDrinkProducts",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/product/drinks");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Error fetching drink products");
    }
  }
);

export const fetchDessertProducts = createAsyncThunk(
  "products/fetchDessertProducts",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/product/desserts");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Error fetching dessert products");
    }
  }
);


// =====================
// Product Slice
// =====================
const productSlice = createSlice({
  name: "products",
  initialState: {
    vegItems: [],
    nonVegItems: [],
    snackItems: [],
    drinkItems: [],
    dessertItems: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVegProducts.pending, (state) => { 
        state.loading = true; 
      })
      .addCase(fetchVegProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.vegItems = action.payload;
      })
      .addCase(fetchVegProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Non-Veg Products
      .addCase(fetchNonVegProducts.pending, (state) => { 
        state.loading = true; 
      })
      .addCase(fetchNonVegProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.nonVegItems = action.payload;
      })
      .addCase(fetchNonVegProducts.rejected, (state, action) => {
        state.error = action.payload;
      })

      // Snack Products (Optional Extension)
      .addCase(fetchSnackProducts.pending, (state) => { 
        state.loading = true; 
      })
      .addCase(fetchSnackProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.snackItems = action.payload;
      })
      .addCase(fetchSnackProducts.rejected, (state, action) => {
        state.error = action.payload;
      })

      // Drink Products
      .addCase(fetchDrinkProducts.pending, (state) => { 
        state.loading = true; 
      })
      .addCase(fetchDrinkProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.drinkItems = action.payload;
      })
      .addCase(fetchDrinkProducts.rejected, (state, action) => {
        state.error = action.payload;
      })

      // Dessert Products
      .addCase(fetchDessertProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDessertProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.dessertItems = action.payload;
      })
      .addCase(fetchDessertProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

  },
});


// Authentication Thunks
// =====================
// Register User Thunk
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await api.post("/auth/signup", formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Registration Failed");
    }
  }
);


// =====================
// Login User Thunk
// =====================
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userCredentials, { rejectWithValue }) => {
    try {
      const res = await api.post("/auth/login", userCredentials);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Login failed");
    }
  }
);


// =====================
// Auth Slice
// =====================
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: JSON.parse(localStorage.getItem("user")) || null,
    token: localStorage.getItem("token") || null,
    isAuthenticated: !!localStorage.getItem("token"),
    loading: false,
    error: null,
  },

  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      if (logoutTimer) clearTimeout(logoutTimer);
      logoutTimer = null;
      console.log("🚪 Logged Out");
    },
  },

  extraReducers: (builder) => {
    builder
      // 🔐 Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.isAuthenticated = true;

        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("user", JSON.stringify(action.payload.user)); // 👈 FIXED
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 📝 Register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.isAuthenticated = true;

        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;

// =====================
// Order Slice
// =====================
export const placeOrder = createAsyncThunk(
  "orders/placeOrder",
  async (orderData) => {
    const res = await api.post("/product/orders", orderData);
    return res.data;
  }
);

const orderSlice = createSlice({
  name: "orders",
  initialState: { 
    loading: false, 
    error: null, 
    success: false 
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(placeOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(placeOrder.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong!";
      });
  },
});




// ===============================
// Order Details Thunk
// ===============================
export const fetchAllOrders = createAsyncThunk(
  "orders/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/product/getorders");
      return res.data; // Must return array of orders
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch orders");
    }
  }
);

const getOrdersSlice = createSlice({
  name: "getOrders",
  initialState: {
    orders: [],   // <-- Important! Prevents undefined error
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload || []; // Ensure array
      })
      .addCase(fetchAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// =====================
// Cart Slice
// =====================
const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      const item = state.find(i => i.id === action.payload.id);
      item ? item.quantity++ : state.push({ ...action.payload, quantity: 1 });
    },
    decreaseQuantity: (state, action) =>
      state.map(i => i.id === action.payload.id && i.quantity > 1 ? { ...i, quantity: i.quantity - 1 } : i),
    removeFromCart: (state, action) => state.filter(i => i.id !== action.payload.id),
    clearCart: (state) => {
      state.cart = []; // Clear the cart
    },
  }
});
export const { addToCart, decreaseQuantity, removeFromCart, clearCart } = cartSlice.actions;

// =====================
// Coupon Slice
// =====================
const couponSlice = createSlice({
  name: "coupon",
  initialState: { code: "", discount: 0, applied: false, message: "" },
  reducers: {
    applyCoupon: (state, action) => {
      const enteredCode = action.payload.toUpperCase();
      if (couponCode[enteredCode]) {
        state.code = enteredCode;
        state.discount = couponCode[enteredCode];
        state.applied = true;
        state.message = `Coupon "${enteredCode}" applied!`;
      } else {
        state.applied = false;
        state.discount = 0;
        state.message = "Invalid Coupon Code";
      }
    },
  }
});
export const { applyCoupon } = couponSlice.actions;

// =====================
// Store
// =====================
const store = configureStore({
  reducer: {
    products: productSlice.reducer,
    cart: cartSlice.reducer,
    coupon: couponSlice.reducer,
    auth: authSlice.reducer,
    orders: orderSlice.reducer,
    getOrders:getOrdersSlice.reducer,
  },
});

// 🔥 Auto Logout on Refresh
const savedToken = localStorage.getItem("token");
if (savedToken) {
  setLogoutTimer(store.dispatch, savedToken);
}

export default store;













// import { configureStore, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import axios from 'axios';
// import { couponCode } from './Component/coupon';
// import { useDispatch } from 'react-redux';

// // const dispatch = useDispatch();

// // Fetch Veg Products
// export const fetchVegProducts = createAsyncThunk(
//   "products/fetchVegProducts",
//   async (_, { rejectWithValue }) => {
//     try {
//       const res = await axios.get("http://localhost:3000/api/product/veg");
//       return res.data; // Veg products
//     } catch (err) {
//       return rejectWithValue(err.response?.data || "Error fetching veg products");
//     }
//   }
// );

// // Fetch NonVeg Products
// export const fetchNonVegProducts = createAsyncThunk(
//   "products/fetchNonVegProducts",
//   async (_, { rejectWithValue }) => {
//     try {
//       const res = await axios.get("http://localhost:3000/api/product/nonveg");
//       return res.data; // Non-Veg products
//     } catch (err) {
//       return rejectWithValue(err.response?.data || "Error fetching non-veg products");
//     }
//   }
// );


// const productSlice = createSlice({
//   name: "products",

//   initialState: {
//     vegItems: [],
//     nonVegItems: [],
//     loading: false,
//     error: null,
//   },

//   reducers: {},

//   extraReducers: (builder) => {
//     builder
//     // 🔹 Veg Products
//       .addCase(fetchVegProducts.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchVegProducts.fulfilled, (state, action) => {
//         state.loading = false;
//         state.vegItems = action.payload;
//       })
//       .addCase(fetchVegProducts.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//     // 🔹 NonVeg Products
//       .addCase(fetchNonVegProducts.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchNonVegProducts.fulfilled, (state, action) => {
//         state.loading = false;
//         state.nonVegItems = action.payload;
//       })
//       .addCase(fetchNonVegProducts.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });


// // Fetching Products From DataBase Like 1st Page Contains 4 items
// // export const fetchProductsByPage = createAsyncThunk(
// //   "products/fetchProductsByPage",
// //   async ({ page, limit, category }, { rejectWithValue }) => {
// //     try {
// //       const res = await axios.get(
// //         `http://localhost:3000/api/product/page?page=${page}&limit=${limit}&category=${category}`
// //       );
// //       return res.data;
// //     } catch (err) {
// //       return rejectWithValue(err.response?.data || "Error fetching products");
// //     }
// //   }
// // );
// // Extra Reducers Mapped with createAsyncThunk
// // const productSlice = createSlice({
// //   name: "products",
// //   initialState: {
// //     vegItems: [],
// //     totalPages: 1,
// //     currentPage: 1,
// //     loading: false,
// //     error: null
// //   },
// //   reducers: {},
// //   extraReducers: (builder) => {
// //     builder
// //       .addCase(fetchProductsByPage.pending, (state) => {
// //         state.loading = true;
// //       })
// //       .addCase(fetchProductsByPage.fulfilled, (state, action) => {
// //         state.loading = false;
// //         const { products, totalPages, currentPage } = action.payload;

// //         state.vegItems = products;   // 🔥 Already veg from backend
// //         state.totalPages = totalPages;
// //         state.currentPage = currentPage;
// //       })

// //       .addCase(fetchProductsByPage.rejected, (state, action) => {
// //         state.loading = false;
// //         state.error = action.payload;
// //       });
// //   }
// // });

// // 🔹 Login API call
// export const loginUser = createAsyncThunk(
//   "auth/loginUser",
//   async ({ email, password }, thunkAPI) => {
//     try {
//       const res = await axios.post("http://localhost:3000/api/auth/login", {
//         email,
//         password,
//       });

//       // ⏳ Start auto logout timer
//       setLogoutTimer(thunkAPI.dispatch);

//       return res.data;
//     } catch (err) {
//       return thunkAPI.rejectWithValue(err.response?.data?.message || "Login Failed!");
//     }
//   }
// );

// // 🔹 Register API call
// export const registerUser = createAsyncThunk(
//   "auth/registerUser",
//   async ({ name, email, password }, thunkAPI) => {
//     try {
//       const res = await axios.post("http://localhost:3000/api/auth/signup", {
//         name,
//         email,
//         password,
//       });

//       // ⏳ Start auto logout timer
//       setLogoutTimer(thunkAPI.dispatch);

//       return res.data;
//     } catch (err) {
//       return thunkAPI.rejectWithValue(err.response?.data?.message || "Signup Failed!");
//     }
//   }
// );

// // 🔹 Auto logout timer
// let logoutTimer;
// const setLogoutTimer = (dispatch) => {
//   if (logoutTimer) clearTimeout(logoutTimer);

//   logoutTimer = setTimeout(() => {
//     dispatch(logout());
//   }, 10000); // 10 seconds
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState: {
//     user: JSON.parse(localStorage.getItem("user")) || null,
//     token: localStorage.getItem("token") || null,
//     loading: false,
//     error: null,
//   },

//   reducers: {
//     logout: (state) => {
//       state.user = null;
//       state.token = null;
//       localStorage.removeItem("user");
//       localStorage.removeItem("token");

//       if (logoutTimer) clearTimeout(logoutTimer);
//     },
//   },

//   extraReducers: (builder) => {
//     builder
//       .addCase(loginUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(loginUser.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = action.payload.user;
//         state.token = action.payload.token;

//         localStorage.setItem("user", JSON.stringify(action.payload.user));
//         localStorage.setItem("token", action.payload.token);
//       })
//       .addCase(loginUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       .addCase(registerUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(registerUser.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = action.payload.user;
//         state.token = action.payload.token;

//         localStorage.setItem("user", JSON.stringify(action.payload.user));
//         localStorage.setItem("token", action.payload.token);
//       })
//       .addCase(registerUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export const { logout } = authSlice.actions;

// export const { logout } = authSlice.actions;

// // ⏳ Auto Logout Timer FIXED POSITION
// let logoutTimer;
// const setLogoutTimer = (dispatch) => {
//   if (logoutTimer) clearTimeout(logoutTimer);

//   logoutTimer = setTimeout(() => {
//     console.log("Auto logout triggered"); // Optional debug
//     dispatch(logout());
//   }, 10000); 
// };


// // const authSlice = createSlice({
// //   name: "auth",
// //   initialState: {
// //     user: JSON.parse(localStorage.getItem("user")) || null,
// //     token: localStorage.getItem("token") || null,
// //     loading: false,
// //     error: null,
// //   },

// //   reducers: {
// //     logout: (state) => {
// //       state.user = null;
// //       state.token = null;
// //       localStorage.removeItem("user");
// //       localStorage.removeItem("token");
// //     },
// //   },

// //   extraReducers: (builder) => {
// //     builder
// //       .addCase(loginUser.pending, (state) => {
// //         state.loading = true;
// //         state.error = null;
// //       })
// //       .addCase(loginUser.fulfilled, (state, action) => {
// //         state.loading = false;
// //         state.user = action.payload.user;
// //         state.token = action.payload.token;

// //         // Save Local Storage
// //         localStorage.setItem("user", JSON.stringify(action.payload.user));
// //         localStorage.setItem("token", action.payload.token);
// //       })
// //       .addCase(loginUser.rejected, (state, action) => {
// //         state.loading = false;
// //         state.error = action.payload;
// //       })


// //       // Register Page
      
// //       .addCase(registerUser.pending, (state) => {
// //         state.loading = true;
// //         state.error = null;
// //       })
// //       .addCase(registerUser.fulfilled, (state, action) => {
// //         state.loading = false;
// //         state.user = action.payload.user;
// //         state.token = action.payload.token;
// //         localStorage.setItem("user", JSON.stringify(action.payload.user));
// //         localStorage.setItem("token", action.payload.token);
// //       })
// //       .addCase(registerUser.rejected, (state, action) => {
// //         state.loading = false;
// //         state.error = action.payload;
// //       })



// //   },
// // });

// // export const { logout } = authSlice.actions;

// // place Order Thunk 
// export const placeOrder = createAsyncThunk("orders/placeOrder",
//   async (orderData) => {
//     const res = await axios.post("http://localhost:3000/api/product/orders", orderData);
//     return res.data;
//   }
// );

// const orderSlice = createSlice({
//   name: "orders",
//   initialState: { 
//     loading: false, 
//     error: null, 
//     success: false,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(placeOrder.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(placeOrder.fulfilled, (state) => {
//         state.success = true;
//       })
//       .addCase(placeOrder.rejected, (state, action) => {
//         state.error = action.payload;
//       });
//   }
// });








// // 🔹 CART SLICE
// const cartSlice = createSlice({
//   name: "cart",
//   initialState: [],
//   reducers: {
//     addToCart: (state, action) => {
//       let item = state.find(i => i.id === action.payload.id);
//       if (item) {
//         item.quantity += 1;
//       } else {
//         state.push({ ...action.payload, quantity: 1 });
//       }
//     },

//     decreaseQuantity: (state, action) => {
//       let item = state.find(i => i.id === action.payload.id);
//       if (item) {
//         if (item.quantity > 1) {
//           item.quantity -= 1;
//         } else {
//           return state.filter(i => i.id !== action.payload.id);
//         }
//       }
//     },

//     removeFromCart: (state, action) => {
//       return state.filter(i => i.id !== action.payload.id);
//     },
//   }
// });

// export const { addToCart, decreaseQuantity, removeFromCart } = cartSlice.actions;


// // 🔹 COUPON SLICE
// const couponSlice = createSlice({
//   name: "coupon",
//   initialState: {
//     code: "",
//     discount: 0,
//     applied: false,
//     message: ""
//   },
//   reducers: {
//     applyCoupon: (state, action) => {
//       const enteredCode = action.payload.toUpperCase();

//       if (couponCode[enteredCode]) {
//         state.code = enteredCode;
//         state.discount = couponCode[enteredCode];
//         state.applied = true;
//         state.message = `Coupon "${enteredCode}" applied! You got ${couponCode[enteredCode]}% off.`;
//       } else {
//         state.message = "Invalid Coupon Code";
//         state.applied = false;
//         state.discount = 0;
//       }
//     },
//   }
// });

// export const { applyCoupon } = couponSlice.actions;


// // 🔹 Store Configuration
// const store = configureStore({
//   reducer: {
//     products: productSlice.reducer,
//     cart: cartSlice.reducer,
//     coupon: couponSlice.reducer,
//     auth : authSlice.reducer,
//     orders: orderSlice.reducer,
//   },
// });

// export default store;
