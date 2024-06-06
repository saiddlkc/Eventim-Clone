import React, { useState } from "react";
import { json, useNavigate } from "react-router-dom";
// import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { Input, Button, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import logo from "../../assets/img/logo-transparent-png.png";
import { useAuthContext } from "../../hooks/useAuthContext";

export function Login() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    role: "" || "customer",
    ProfilePicture: null,
  });

  const { dispatch } = useAuthContext();
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!credentials.email || !credentials.password) {
      toast.error("Both email and password are required");
      return;
    }

    const formData = new FormData();
    Object.keys(credentials).forEach((key) => {
      formData.append(key, credentials[key]);
    });

    axios
      .post("http://localhost:4000/auth/login", credentials)
      .then((res) => {
        toast.success("Login successful!");
        localStorage.setItem("user", res.data.token);
        dispatch({ type: "LOGIN", payload: res.data });
        navigate("/");
      })
      .catch((err) => {
        toast.error("Error logging in. Please try again.");
        console.log(err);
      });
  };

  // const handleGoogleSuccess = (response) => {
  //   console.log(response);

  //   axios
  //     .post("http://localhost:4000/auth/google", {
  //       token: response.credential,
  //     })
  //     .then((res) => {
  //       toast.success("Login with Google successful!");
  //       console.log(res.data);
  //       navigate("/");
  //       localStorage.setItem("token", res.data.token);
  //     })
  //     .catch((err) => {
  //       toast.error("Error logging in with Google. Please try again.");
  //       console.log(err);
  //     });
  // };

  // const handleGoogleFailure = (error) => {
  //   toast.error("Google Sign In was unsuccessful. Try again later.");
  //   console.log(error);
  // };

  return (
    // <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
    <section className="m-24 flex justify-center align-center">
      <ToastContainer />
      <div className="w-full lg:w-3/5 flex flex-col items-center justify-center">
        <div className="justify-center">
          <img src={logo} alt="logo" className="h-48" />
        </div>
        <div className="text-center">
          <Typography variant="h2" className="font-bold mb-4">
            Login
          </Typography>
          <Typography
            variant="paragraph"
            color="blue-gray"
            className="text-lg font-normal"
          >
            Sign in to access all the features.
          </Typography>
        </div>
        <form
          className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-6">
            <Input
              type="email"
              label="Email Address"
              name="email"
              value={credentials.email}
              onChange={handleChange}
            />
            <Input
              type="password"
              size="md"
              label="Password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
            />
            <Button
              type="submit"
              className="w-full flex items-center justify-center gap-2"
            >
              Login
            </Button>
            {/* <div className="space-y-4">
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onFailure={handleGoogleFailure}
                  useOneTap
                />
              </div> */}
          </div>
        </form>
        <Typography
          variant="paragraph"
          className="text-center text-blue-gray-500 font-medium mt-4"
        >
          Don't have an account yet?{" "}
          <Link to="/sign-up" className="text-gray-900 ml-1">
            Sign Up
          </Link>
        </Typography>
      </div>
    </section>
    // </GoogleOAuthProvider>
  );
}

export default Login;
