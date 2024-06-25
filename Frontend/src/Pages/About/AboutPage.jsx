import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Avatar,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";
import { LinkIcon, GlobeAltIcon } from "@heroicons/react/24/outline";

function TeamCard({ img, name, title }) {
  return (
    <Card className="rounded-lg bg-[#2D2D2D] shadow-md">
      <CardBody className="text-center">
        <Avatar
          src={img}
          alt={name}
          variant="circular"
          size="xxl"
          className="mx-auto mb-6 object-cover border-4 border-gray-800"
        />
        <Typography variant="h5" color="white" className="!font-medium text-lg">
          {name}
        </Typography>
        <Typography variant="body1" color="orange" className="!text-sm">
          {name === "Durmus Cetmi"
            ? "Full-stack Developer"
            : "Full-stack Developer"}
        </Typography>

        <div className="flex items-center justify-center gap-1.5">
          <IconButton variant="text" color="gray">
            <GlobeAltIcon className="h-6 w-6 text-white" />
          </IconButton>
          <IconButton variant="text" color="gray">
            <LinkIcon className="h-6 w-6 text-white" />
          </IconButton>
        </div>
      </CardBody>
    </Card>
  );
}

export function AboutPage() {
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/dashboard/Users"
        );
        const adminUsers = response.data.filter(
          (user) => user.role === "admin"
        );
        setAdmins(adminUsers);
      } catch (error) {
        console.error("Error fetching admin users:", error);
      }
    };

    fetchAdmins();
  }, []);

  return (
    <section className="min-h-screen py-8 px-8 lg:py-28 bg-white">
      <div className="container mx-auto">
        <div className="mb-16 text-center lg:mb-28">
          <Typography variant="h6" color="black" className="text-lg">
            Meet Our Admins
          </Typography>
          <Typography
            variant="h1"
            color="black"
            className="my-2 !text-2xl lg:!text-4xl"
          >
            The Minds Behind Our Success
          </Typography>
          <Typography
            variant="lead"
            className="mx-auto w-full !text-gray-600 max-w-4xl"
          >
            Our dedicated admins ensure everything runs smoothly, providing
            exceptional leadership and support across the board.
          </Typography>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {admins.map((admin, key) => (
            <TeamCard
              key={key}
              img={admin.profilePicture || "default-profile.png"}
              name={admin.name}
              title={admin.role}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default AboutPage;
