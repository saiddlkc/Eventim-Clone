import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

const EventCardList = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/dashboard/event")
      .then((response) => {
        const selectedEvents = response.data.slice(0, 6);
        setEvents(selectedEvents);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <Card key={event._id} className="mt-6 w-full">
            <CardHeader color="blue-gray" className="relative h-56">
              <img
                src={event.bild}
                alt={event.titel}
                className="w-full h-full object-cover"
              />
            </CardHeader>
            <CardBody>
              <Typography variant="h5" color="blue-gray" className="mb-2">
                {event.titel}
              </Typography>
              <Typography>{event.beschreibung}</Typography>
            </CardBody>
            <CardFooter className="pt-0">
              <Button
                onClick={() => window.open(event.link, "_blank")}
                className="bg-[#F76B1A]"
              >
                Read More
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default EventCardList;
