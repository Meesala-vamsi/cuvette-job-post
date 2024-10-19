import React, { useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import ProtectedRoute from "./components/protectedRoute";
import Layout from "./components/Layout/Layout";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import Register from "./pages/Register";
import Verify from "./pages/Verify/Verify";
import { checkAuth, resetTokenAndCredentials } from "./store/slices/authSlice";
import Home from "./pages/Home";
import DashboardLayout from "./components/DashboardLayout/DashboardLayout";

const App = () => {
  const { isAuthenticated, isLoading ,user} = useSelector((state) => state.auth);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const token = JSON.parse(sessionStorage.getItem("token"));
    dispatch(checkAuth(token))
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="absolute inset-0 bottom-1/2 flex items-center justify-center min-h-screen">
        <div className="loader border-t-transparent border-4 border-gray-400 rounded-full w-9 h-9 animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <header className="flex justify-between items-center px-4 py-2">
        <img
          src="https://res.cloudinary.com/db0f83m76/image/upload/v1729317738/image_650_1_r58g0k.png"
          alt="logo"
          className="h-6"
        />
        <div className="flex gap-9">
          <h1 className="text-gray-400 text-lg">Contact</h1>
          {location.pathname.includes("home") ? (
            <div className="flex items-center gap-3">
              <div className="border border-gray-500 px-4">
                <p>{user?.name}</p>
              </div>
              <div>
                <button className="bg-black py-1 text-white" onClick={()=>{
                  const token = sessionStorage.removeItem("token")
                  dispatch(resetTokenAndCredentials())
                  toast.success("Logged out successfully..")
                }}>Logout</button>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </header>
      <div className="min-h-screen">
        <Routes>
          <Route
            path="/"
            element={<ProtectedRoute isAuthenticated={isAuthenticated} />}
          />
          <Route
            path="auth/"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="verify" element={<Verify />} />
          </Route>

          <Route
            path="dashboard/"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route path="home" element={<Home />} />
          </Route>
        </Routes>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default App;
