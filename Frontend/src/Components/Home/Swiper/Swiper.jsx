import React, { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate } from "react-router-dom";

// Import Swiper styles
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import "swiper/css/autoplay";

// import required modules
import { Grid, Pagination, Autoplay } from "swiper/modules";
import { Card } from "@material-tailwind/react";

const SwiperMain = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:4000/dashboard/event")
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const chunkedEvents = [];
  for (let i = 0; i < events.length; i += 12) {
    chunkedEvents.push(events.slice(i, i + 12));
  }

  const handleCardClick = (eventId) => {
    navigate(`/events/${eventId}`);
  };

  return (
    <Swiper
      slidesPerView={1}
      grid={{
        rows: 1,
      }}
      spaceBetween={30}
      pagination={{
        clickable: true,
      }}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      speed={2000}
      modules={[Grid, Pagination, Autoplay]}
      className="container w-full h-full mx-auto"
    >
      {chunkedEvents.map((eventGroup, index) => (
        <SwiperSlide key={index} className="flex justify-center items-center">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 my-1">
            {eventGroup.map((event) => (
              <Card
                key={event._id}
                className="w-full cursor-pointer"
                onClick={() => handleCardClick(event._id)}
              >
                <div className="relative h-[220px] p-0.5">
                  <img
                    src={event.bild}
                    alt={event.titel}
                    className="w-full h-full object-cover object-top rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 ease-in-out transform hover:scale-95 hover:rotate-1"
                  />
                </div>
              </Card>
            ))}
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SwiperMain;
