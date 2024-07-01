import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import axios from "axios";
import { Pagination, Navigation } from "swiper/modules";
import { Link } from "react-router-dom";
import "./SwiperStyles.css"; // Importiere die benutzerdefinierte CSS-Datei

const ComedySwiper = () => {
  const [comedyEvents, setComedyEvents] = useState([]);

  useEffect(() => {
    fetchComedyEvents();
  }, []);

  const fetchComedyEvents = async () => {
    try {
      const response = await axios.get("http://localhost:4000/dashboard/event");
      const comedyEventsData = response.data.filter(
        (event) => event.kategorie === "Comedy"
      );
      setComedyEvents(comedyEventsData);
    } catch (error) {
      console.error("Error fetching comedy events:", error);
    }
  };

  return (
    <div className="container mx-auto mt-8 pr-6 border-t-4 border-r-4 border-gray-300 ">
      <p className="text-2xl py-2">Comedy</p>
      <Swiper
        spaceBetween={1}
        slidesPerView={6}
        loop={true}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {comedyEvents.length > 0 ? (
          comedyEvents.map((event) => (
            <SwiperSlide key={event.id}>
              <div className="comedy-event ">
                <Link className="" to={`/events/${event._id}`}>
                  <img src={event.bild} alt={event.titel} />
                </Link>
              </div>
            </SwiperSlide>
          ))
        ) : (
          <SwiperSlide>
            <p>Keine Comedy-Events gefunden.</p>
          </SwiperSlide>
        )}
      </Swiper>
    </div>
  );
};

export default ComedySwiper;
