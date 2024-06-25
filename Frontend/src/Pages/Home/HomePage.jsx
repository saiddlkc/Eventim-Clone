import React, { useEffect, useState } from "react";
import Settings from "../../Components/Home/Settings";
import AllCities from "../Citys/Allcities";
import CarouselWithContent from "../../Components/Home/CarouselCities";
import CarouselWithEvents from "../../Components/Home/CorouselEvents";
import EventList from "../../Components/Home/EventList";
import EventCardList from "../../Components/Home/EventCardList";
import TicketBox from "../../Components/Tickets/TicketBox";
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
        <CarouselWithEvents />
        <EventCardList />
        <CarouselWithContent />
        <div className="container mx-auto">
          <AllCities />
        </div>
        <EventList />
      </div>
    </div>
  );
};

export default HomePage;
