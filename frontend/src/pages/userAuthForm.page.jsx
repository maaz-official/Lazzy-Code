import React, { useEffect, useRef, useState, useContext } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import InputBox from "../components/input.component";
import "./styles/background-animation.css";
import { useTheme } from "../themecontext";
import { MoonIcon, SunIcon } from "@heroicons/react/solid";
import AnimationWrapper from "../components/page-animation";
import { motion } from "framer-motion";
import { toast, Toaster } from "react-hot-toast";
import api from "../api/api.js";
import { UserContext } from "../App"; // Correct context import

export default function UserAuthForm({ type }) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const { theme, toggleTheme } = useTheme();
  const { userAuth, setUserAuth } = useContext(UserContext); // Correct context usage
  const navigate = useNavigate();

  const toggleMode = () => {
    toggleTheme();
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const handleBodyClick = (event) => {
      const body = document.querySelector("body");
      const spark = document.createElement("div");
      spark.classList.add("spark");
      body.appendChild(spark);

      spark.style.top = `${event.clientY - body.offsetTop}px`;
      spark.style.left = `${event.clientX - body.offsetLeft}px`;
      spark.style.filter = `hue-rotate(${Math.random() * 360}deg)`;

      for (let i = 0; i < 7; i++) {
        const span = document.createElement("span");
        span.style.transform = `rotate(${i * 45}deg)`;
        spark.appendChild(span);
      }

      setTimeout(() => {
        spark.remove();
      }, 1000);
    };

    document.body.addEventListener("click", handleBodyClick);

    return () => {
      document.body.removeEventListener("click", handleBodyClick);
    };
  }, []);

  const authForm = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const errors = validate();

    if (Object.keys(errors).length > 0) {
      Object.values(errors).forEach((error) => {
        toast.error(error);
      });
      setLoading(false);
      return;
    }

    try {
      const response = await api.post(
        type === "sign-in" ? "/api/users/signin" : "/api/users/signup",
        formData
      );

      const { token, user } = response.data;

      sessionStorage.setItem("token", token);
      setUserAuth({ access_token: token, user });
      setLoading(false);

      toast.success(
        type === "sign-in"
          ? "Sign-in successful!"
          : "User registered successfully!"
      );

      if (type === "sign-in") {
        navigate("/");
      }
    } catch (error) {
      console.error("Error:", error.response.data.message);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Failed to authenticate. Please check your credentials.");
      }
      setLoading(false);
    }
  };

  const validate = () => {
    const errors = {};
    if (type !== "sign-in" && !formData.username) {
      errors.username = "Username is required.";
    }
    if (!formData.email) {
      errors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email address is invalid.";
    }
    if (!formData.password) {
      errors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters long.";
    }
    return errors;
  };

  if (userAuth?.access_token) {
    return <Navigate to="/" />;
  }

  return (
    <AnimationWrapper keyValue={type}>
      <div
        className={`relative h-screen overflow-hidden flex items-center justify-center ${
          theme === "dark" ? "dark" : ""
        } sm:mt-8 md:mt-8`}
      >
        <div className="flex flex-col lg:flex-row items-center justify-center w-full max-w-6xl p-4 overflow-y-auto">
          <motion.div
            className={`relative z-10 flex flex-col items-center justify-center ${
              type === "sign-in" ? "w-full lg:w-1/2" : "w-full lg:w-1/3"
            } max-w-md p-8 rounded-md shadow-lg ${
              theme === "dark"
                ? "bg-gray-800 text-white"
                : "bg-white text-black"
            } mb-4 lg:mb-0 lg:mr-4`}
            initial={{ opacity: 0, y: -50, scale: 0.8, rotate: -20 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, y: -50, scale: 0.8, rotate: 20 }}
            transition={{ duration: 0.5 }}
          >
            <Typography variant="h4" component="h1" gutterBottom>
              Welcome to Our Blog!
            </Typography>
            <Typography variant="body1" gutterBottom>
              Discover a variety of articles, stories, and insights from our
              community. Join us to share your thoughts and experiences.
            </Typography>
            <Link to="/" style={{ textDecoration: "none", marginTop: "20px" }}>
              <Button
                variant="contained"
                color="primary"
                sx={{
                  backgroundColor: "#e3f0ad",
                  color: "#000",
                  padding: "10px 20px",
                  borderRadius: "999px",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                  textTransform: "none",
                  fontSize: "18px",
                  transition: "background-color 0.3s ease",
                  "&:hover": {
                    backgroundColor: "#adadad",
                    transform: "scale(1.05)",
                  },
                }}
              >
                Back to Home
              </Button>
            </Link>
            <button
              className="bg-gray-700 text-black py-1 px-2 rounded-md flex items-center space-x-2 mt-4"
              onClick={toggleMode}
              style={{ cursor: "pointer" }}
            >
              {theme === "dark" ? (
                <SunIcon className="h-5 w-5 text-white" />
              ) : (
                <MoonIcon className="h-5 w-5 text-black" />
              )}
              <span className={theme === "dark" ? "text-white" : "text-black"}>
                {theme === "dark" ? "Light Mode" : "Dark Mode"}
              </span>
            </button>
          </motion.div>

          <motion.section
            className="relative z-10 flex items-center justify-center w-full lg:w-1/2"
            initial={{ opacity: 0, y: -50, scale: 0.8, rotate: -20 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, y: -50, scale: 0.8, rotate: 20 }}
            transition={{ duration: 0.5 }}
          >
            <form
              ref={authForm}
              className={`w-full max-w-[500px] p-8 rounded-md shadow-lg ${
                theme === "dark"
                  ? "bg-gray-800 text-white"
                  : "bg-white text-black"
              }`}
              onSubmit={handleSubmit}
            >
              <h1
                className={`text-4xl font-bold capitalize text-center mb-6 ${
                  theme === "dark" ? "text-white" : "text-black"
                }`}
              >
                {type === "sign-in" ? "Welcome back!" : "Join us now!"}
              </h1>
              {type !== "sign-in" && (
                <InputBox
                  type="text"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleChange}
                  id="username"
                  name="username"
                  icon="fi-rr-user"
                  theme={theme}
                />
              )}

              <InputBox
                type="text"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                id="email"
                name="email"
                icon="fi-rr-envelope"
                theme={theme}
              />

              <InputBox
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                id="password"
                name="password"
                icon="fi-rr-lock"
                theme={theme}
              />

              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                className="mt-4"
                disabled={loading}
                sx={{
                  backgroundColor: "#3f51b5",
                  color: "#fff",
                  padding: "10px 20px",
                  borderRadius: "999px",
                  textTransform: "none",
                  fontSize: "18px",
                  transition: "background-color 0.3s ease",
                  "&:hover": {
                    backgroundColor: "#303f9f",
                  },
                }}
              >
                {loading
                  ? "Loading..."
                  : type === "sign-in"
                  ? "Sign In"
                  : "Sign Up"}
              </Button>

              <div className="mt-4 text-center">
                <Typography variant="body2">
                  {type === "sign-in"
                    ? "Don't have an account?"
                    : "Already have an account?"}{" "}
                  <Link
                    to={type === "sign-in" ? "/sign-up" : "/sign-in"}
                    className="text-blue-500 underline"
                  >
                    {type === "sign-in" ? "Sign Up" : "Sign In"}
                  </Link>
                </Typography>
              </div>
            </form>
          </motion.section>
        </div>
      </div>
      <Toaster />
    </AnimationWrapper>
  );
}
