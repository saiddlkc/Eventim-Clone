import React, { useEffect, useState } from "react";
import Settings from "../../Components/Home/Settings";
import AllCities from "../Citys/Allcities";
import CarouselWithContent from "../../Components/Home/Carousel";

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
      <div className="">
        <CarouselWithContent />

        <AllCities />
      </div>
    </div>
  );
};

export default HomePage;
