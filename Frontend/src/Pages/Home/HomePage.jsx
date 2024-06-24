import React, { useEffect, useState } from "react";
import Settings from "../../Components/Home/Settings";
import AllCities from "../Citys/Allcities";
import CarouselWithContent from "../../Components/Home/CarouselCities";
import CarouselWithEvents from "../../Components/Home/CorouselEvents";
import EventList from "../../Components/Home/EventList";
// import EventCardList from "../../Components/Home/EventCardList";
import SwiperMain from "../../Components/Home/Swiper/Swiper";
import ComedySwiper from "../../Components/Home/ComedySwiper";
import KonzertSwiper from "../../Components/Home/KonzertSwiper";
import ShowSwiper from "../../Components/Home/ShowSwiper";
import NewsLetter from "../../Components/Home/NewsLetter";
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
          <AllCities />
        </div>
        <CarouselWithEvents />
        {/* <EventCardList /> */}
        <ComedySwiper />
        <KonzertSwiper />
        <EventList />
        <ShowSwiper />
        <NewsLetter />
        <Help />
      </div>
    </div>
  );
};

export default HomePage;
