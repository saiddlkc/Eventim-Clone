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
      <div className="lg:grid md:grid-cols-5  my-4 sm:flex sm:flex-wrap sm:justify-center sm:items-center md:flex md:flex-wrap md:justify-center lg:gap-2 m-10">
        {cities.map((city, index) => (
          <Link
            to={city.link}
            key={index}
            className="border-2 p-4 text-center flex flex-col items-center rounded-lg  mt-3 hover:bg-gray-100 hover:shadow-lg transition duration-500 ease-in-out"
          >
            <img src={city.imgSrc} alt={city.name} className="w-52 " />
            <p className="text-center">die coolsten Events in</p>
            <span className="text-orange-800 text-center ">{city.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AllCities;
