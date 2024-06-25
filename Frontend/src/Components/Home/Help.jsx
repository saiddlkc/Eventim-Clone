import React from "react";
import { Link } from "react-router-dom";

const Help = () => {
  return (
    <div className="container mx-auto w-full ">
      <Link to="/contact">
        <img
          className="w-full"
          src="https://www.eventim.de/obj/media/DE-eventim/teaser/de/additional-content/2023/eve-help-center-additional-content-d-03.jpg"
          alt=""
        />
      </Link>
    </div>
  );
};

export default Help;
