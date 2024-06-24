import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import axios from "axios";
import { Pagination, Navigation } from "swiper/modules";
import { Link } from "react-router-dom";

const ShowSwiper = () => {
  const [showEvents, setShowEvents] = useState([]);

  useEffect(() => {
    fetchShowEvents();
  }, []);

  const fetchShowEvents = async () => {
    try {
      const response = await axios.get("http://localhost:4000/dashboard/event");
      const showEventsData = response.data.filter(
        (event) => event.kategorie === "Show"
      );
      setShowEvents(showEventsData);
    } catch (error) {
      console.error("Error fetching show events:", error);
    }
  };

  return (
    <div className="container mx-auto mt-8 pr-6 border-t-4 border-r-4 border-gray-300 my-2">
      <p className="text-2xl py-2 ">Shows</p>
      <Swiper
        pagination={{
          type: "fraction",
        }}
        spaceBetween={1}
        slidesPerView={6}
        loop={true}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {showEvents.length > 0 ? (
          showEvents.map((event) => (
            <SwiperSlide key={event.id}>
              <div className="show-event">
                <Link to={`/events/${event._id}`}>
                  <img src={event.bild} alt={event.titel} />{" "}
                </Link>
              </div>
            </SwiperSlide>
          ))
        ) : (
          <SwiperSlide>
            <p>Keine Shows gefunden.</p>
          </SwiperSlide>
        )}
      </Swiper>
    </div>
  );
};

export default ShowSwiper;
