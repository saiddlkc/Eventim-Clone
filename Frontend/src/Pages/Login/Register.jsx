import { useState } from "react";
import { Input, Checkbox, Button, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import logo from "../../assets/img/logo-transparent-png.png";
import { useNavigate } from "react-router-dom";

export function SignUp() {
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "" || "customer",
    profilePicture: null,
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform form validation
    if (!newUser.name || !newUser.email || !newUser.password || !newUser.role) {
      toast.error("All fields except profile picture are required");
      return;
    }

    const formData = new FormData();
    Object.keys(newUser).forEach((key) => {
      formData.append(key, newUser[key]);
    });

    axios
      .post("http://localhost:4000/dashboard/users", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(() => {
        toast.success("Registration successful!");
        setNewUser({
          name: "",
          email: "",
          password: "",
          role: "" || "customer",
          profilePicture: null,
        });
        navigate("/login");
      })
      .catch((err) => {
        toast.error("Error registering user. Please try again.");
        console.log(err);
      });
  };

  return (
    <section className="m-24 flex justify-center align-center">
      <ToastContainer />
      <div className="w-full lg:w-3/5 flex flex-col items-center justify-center">
        <div className="justify-center">
          <Link to={"/"}>
            <img src={logo} alt="logo" className="h-48" />
          </Link>
        </div>
        <div className="text-center">
          <Typography variant="h2" className="font-bold mb-4">
            Registrieren
          </Typography>
          <Typography
            variant="paragraph"
            color="blue-gray"
            className="text-lg font-normal"
          >
            Erstellen Sie ein Konto, um alle Vorteile zu nutzen.
          </Typography>
        </div>
        <form
          className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-6">
            <Input
              size="lg"
              label="Name"
              name="name"
              value={newUser.name}
              onChange={handleChange}
            />
            <Input
              type="email"
              label="Email Address"
              name="email"
              value={newUser.email}
              onChange={handleChange}
              className="pr-20"
              containerProps={{
                className: "min-w-0",
              }}
            />
            <Input
              type="password"
              size="md"
              label="Password"
              name="password"
              value={newUser.password}
              onChange={handleChange}
            />
            <Checkbox
              label={
                <Typography
                  variant="small"
                  color="gray"
                  className="flex items-center justify-start font-medium"
                >
                  Ich stimme zu&nbsp;
                  <a
                    href="#"
                    className="font-normal text-black transition-colors hover:text-gray-900 underline"
                  >
                    Geschäftsbedingungen
                  </a>
                </Typography>
              }
              containerProps={{ className: "-ml-2.5" }}
            />
            <Button
              type="submit"
              className="w-full flex items-center justify-center gap-2"
            >
              Complete Registration
            </Button>
          </div>
        </form>
        <div className="space-y-4 mt-8">
          <Button
            size="lg"
            color="black"
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
        <Typography
          variant="paragraph"
          className="text-center text-blue-gray-500 font-medium mt-4"
        >
          Sie haben bereits ein Konto?
          <Link to="/login" className="text-gray-900 ml-1">
            Sign in
          </Link>
        </Typography>
      </div>
    </section>
  );
}

export default SignUp;
