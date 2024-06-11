import { useState } from "react";
import { Input, Checkbox, Button, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import logo from "../../assets/img/logo-transparent-png.png";
import registrieren from "../../assets/img/registrieren.jpg";
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
        setTimeout(() => {
          navigate("/login");
        }, 2000); // Redirect after 2 seconds
      })
      .catch((err) => {
        toast.error("Error registering user. Please try again.");
        console.log(err);
      });
  };

  return (
    <section className="m-8 flex flex-col items-center">
      <ToastContainer />
      <div className="text-center mb-8">
        <Link to={"/"}>
          <img src={logo} alt="logo" className="h-64 mx-auto" />
        </Link>
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
      <div className="flex w-full lg:w-3/5 items-center justify-between gap-4">
        <div className="w-full lg:w-1/2">
          <form
            className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg"
            onSubmit={handleSubmit}
          >
            <div className="mb-1 flex flex-col gap-6">
              <Typography
                variant="small"
                color="blue-gray"
                className="-mb-3 font-medium"
              >
                Name
              </Typography>
              <Input
                size="lg"
                name="name"
                value={newUser.name}
                onChange={handleChange}
                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              <Typography
                variant="small"
                color="blue-gray"
                className="-mb-3 font-medium"
              >
                Email Address
              </Typography>
              <Input
                type="email"
                size="lg"
                name="email"
                value={newUser.email}
                onChange={handleChange}
                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              <Typography
                variant="small"
                color="blue-gray"
                className="-mb-3 font-medium"
              >
                Password
              </Typography>
              <Input
                type="password"
                size="lg"
                name="password"
                value={newUser.password}
                onChange={handleChange}
                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
            </div>
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
            <Button type="submit" className="mt-6" fullWidth>
              Complete Registration
            </Button>
          </form>
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
        <div className="w-1/2 h-full hidden lg:flex items-center justify-center ml-4">
          <img
            src={registrieren}
            className="h-full w-full object-cover rounded-3xl shadow-2xl border-2 border-gray-200 hover:shadow-2xl transition duration-300 ease-in-out"
          />
        </div>
      </div>
    </section>
  );
}

export default SignUp;
