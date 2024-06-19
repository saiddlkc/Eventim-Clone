import React from "react";
import { Link, Outlet } from "react-router-dom";
import "../../index.css";

const cities = [
  {
    name: "Berlin",
    imgSrc:
      "https://www.eventim.de/obj/media/DE-eventim/teaser/de/156x198/2023/staedteteaser-tickets-poster-berlin.jpg",
    link: "/cities/berlin",
  },
  {
    name: "Düsseldorf",
    imgSrc:
      "https://www.eventim.de/obj/media/DE-eventim/teaser/de/156x198/2023/staedteteaser-tickets-poster-duesseldorf.jpg",
    link: "/cities/duesseldorf",
  },
  {
    name: "Frankfurt",
    imgSrc:
      "https://www.eventim.de/obj/media/DE-eventim/teaser/de/156x198/2023/staedteteaser-tickets-poster-frankfurt.jpg",
    link: "/cities/frankfurt",
  },
  {
    name: "Hamburg",
    imgSrc:
      "https://www.eventim.de/obj/media/DE-eventim/teaser/de/156x198/2023/staedteteaser-tickets-poster-hamburg.jpg",
    link: "/cities/hamburg",
  },
  {
    name: "Köln",
    imgSrc:
      "https://www.eventim.de/obj/media/DE-eventim/teaser/de/156x198/2023/staedteteaser-tickets-poster-koeln.jpg",
    link: "/cities/koeln",
  },
  {
    name: "München",
    imgSrc:
      "https://www.eventim.de/obj/media/DE-eventim/teaser/de/156x198/2023/staedteteaser-tickets-poster-muenchen.jpg",
    link: "/cities/muenchen",
  },
  {
    name: "Stuttgart",
    imgSrc:
      "https://www.eventim.de/obj/media/DE-eventim/teaser/de/156x198/2023/staedteteaser-tickets-poster-stuttgart.jpg",
    link: "/cities/stuttgart",
  },
  {
    name: "Leipzig",
    imgSrc:
      "https://www.eventim.de/obj/media/DE-eventim/teaser/de/156x198/2023/staedteteaser-tickets-poster-leipzig.jpg",
    link: "/cities/leipzig",
  },
  {
    name: "Bremen",
    imgSrc:
      "https://www.eventim.de/obj/media/DE-eventim/teaser/de/156x198/2023/staedteteaser-tickets-poster-bremen.jpg",
    link: "/cities/bremen",
  },
];

const AllCities = () => {
  return (
    <div>
      <Outlet />
      <div className="">
        <div>
          <div className="flex  flex-wrap justify-center gap-8 my-4 ">
            {cities.map((city, index) => (
              <Link
                to={city.link}
                key={index}
                className="border-2 p-4 hover:scale-105 transition-transform duration-500 ease-in-out "
              >
                <img src={city.imgSrc} alt={city.name} />
                <p>die coolsten Events in</p>
                <Link className="text-orange-800 ">{city.name}</Link>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllCities;
