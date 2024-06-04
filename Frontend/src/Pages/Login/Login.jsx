import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import logo from "../../assets/img/logo-transparent-png.png";

export function Login() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });


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

    axios
      .post("http://localhost:4000/auth/login", credentials)
      .then((res ) => {
        toast.success("Login successful!");
        console.log(res.data);
        navigate("/");
      })
      .catch((err) => {
        toast.error("Error logging in. Please try again.");
        console.log(err);
        
      });
  };

  return (
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
            <div className="space-y-4">
          <Button
            size="lg"
            color=""
            className="flex items-center gap-2 justify-center shadow-md"
            fullWidth
          >
            <svg
              width="17"
              height="16"
              viewBox="0 0 17 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_1156_824)">
                <path
                  d="M16.3442 8.18429C16.3442 7.64047 16.3001 7.09371 16.206 6.55872H8.66016V9.63937H12.9813C12.802 10.6329 12.2258 11.5119 11.3822 12.0704V14.0693H13.9602C15.4741 12.6759 16.3442 10.6182 16.3442 8.18429Z"
                  fill="#4285F4"
                />
                <path
                  d="M8.65974 16.0006C10.8174 16.0006 12.637 15.2922 13.9627 14.0693L11.3847 12.0704C10.6675 12.5584 9.7415 12.8347 8.66268 12.8347C6.5756 12.8347 4.80598 11.4266 4.17104 9.53357H1.51074V11.5942C2.86882 14.2956 5.63494 16.0006 8.65974 16.0006Z"
                  fill="#34A853"
                />
                <path
                  d="M4.16852 9.53356C3.83341 8.53999 3.83341 7.46411 4.16852 6.47054V4.40991H1.51116C0.376489 6.67043 0.376489 9.33367 1.51116 11.5942L4.16852 9.53356Z"
                  fill="#FBBC04"
                />
                <path
                  d="M8.65974 3.16644C9.80029 3.1488 10.9026 3.57798 11.7286 4.36578L14.0127 2.08174C12.5664 0.72367 10.6469 -0.0229773 8.65974 0.000539111C5.63494 0.000539111 2.86882 1.70548 1.51074 4.40987L4.1681 6.4705C4.8001 4.57449 6.57266 3.16644 8.65974 3.16644Z"
                  fill="#EA4335"
                />
              </g>
              <defs>
                <clipPath id="clip0_1156_824">
                  <rect
                    width="16"
                    height="16"
                    fill="white"
                    transform="translate(0.5)"
                  />
                </clipPath>
              </defs>
            </svg>
            <span>Sign in With Google</span>
          </Button>
        </div>
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
  );
}

export default Login;
