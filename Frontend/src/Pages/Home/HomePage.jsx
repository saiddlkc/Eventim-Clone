import React, { useEffect, useState } from "react";
import Settings from "../../Components/Home/Settings";
import AllCitiesCard from "../../Components/Home/AllCitiesCard";
import CarouselWithContent from "../../Components/Home/CarouselCities";
import CarouselWithEvents from "../../Components/Home/CorouselEvents";
import EventList from "../../Components/Home/EventList";
import MasonryGridGallery from "../../Components/Home/Galery";

import SwiperMain from "../../Components/Home/Swiper/Swiper";
import ComedySwiper from "../../Components/Home/ComedySwiper";
import KonzertSwiper from "../../Components/Home/KonzertSwiper";
import NewsLetter from "../../Components/Home/Newsletter";
import Help from "../../Components/Home/Help";

const HomePage = () => {
  const [backgroundColor, setbackgroundColor] = useState("white");

  useEffect(() => {
    const savedColor = localStorage.getItem("backgroundColor");
    if (savedColor) {
      setbackgroundColor(savedColor);
    }
  }, []);

  const handleSetBackgroundColor = (color) => {
    setbackgroundColor(color);
    localStorage.setItem("backgroundColor", color);
  };

  return (
    <div style={{ backgroundColor: backgroundColor }}>
      <Settings setBackgroundColor={handleSetBackgroundColor} />
      <div className="relative z-10">
        <SwiperMain />
        <CarouselWithContent />
        <div className="container mx-auto">
          <AllCitiesCard />
          <ComedySwiper />
          <KonzertSwiper />
          <CarouselWithEvents />
          <ComedySwiper />
          <KonzertSwiper />
          <EventList />
          <NewsLetter />

          <MasonryGridGallery />
          <Help />
        </div>
        {/* <EventCardList /> */}
      </div>
    </div>
  );
};

export default HomePage;
