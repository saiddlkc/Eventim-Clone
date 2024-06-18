import React, { useEffect, useState } from "react";
import Settings from "../../Components/Home/Settings";

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
    <div style={{ backgroundColor: backgroundColor, height: "100vh" }}>
      <Settings setBackgroundColor={handleSetBackgroundColor} />
      home
    </div>
  );
};

export default HomePage;
