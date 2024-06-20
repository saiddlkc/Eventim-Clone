import { useState, useEffect } from "react";
import axios from "axios";
import { Carousel, Typography, Button } from "@material-tailwind/react";
import { sampleSize } from "lodash";

export default function CarouselWithEvents() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/dashboard/event")
      .then((response) => {
        const allEvents = response.data;
        const randomEvents = sampleSize(allEvents, 7);
        setEvents(randomEvents);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <Carousel
      className="h-[300px] container mx-auto"
      autoplay={true}
      interval={3000}
    >
      {events.map((event) => (
        <div key={event._id} className="relative h-full w-full">
          <img
            src={event.bild}
            alt={event.titel}
            className="h-full w-full object-cover object-top"
          />
          <div className="absolute inset-0 grid h-full w-full place-items-center bg-black/75">
            <div className="w-3/4 text-center md:w-2/4">
              <Typography
                variant="h1"
                color="white"
                className="mb-4 text-3xl md:text-4xl lg:text-5xl"
              >
                {event.titel}
              </Typography>
              <Typography
                variant="lead"
                color="white"
                className="mb-12 opacity-80"
              >
                {event.beschreibung}
              </Typography>
              <div className="flex justify-center gap-2">
                <Button size="sm" color="white">
                  Mehr erfahren
                </Button>
                <Button size="sm" color="white" variant="text">
                  Tickets kaufen
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </Carousel>
  );
}
