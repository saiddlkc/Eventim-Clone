import React from "react";
import { Link, Outlet } from "react-router-dom";
import "../../index.css";

const categories = [
  {
    title: "Comedy",
    imgSrc:
      "https://www.eventim.de/obj/media/DE-eventim/teaser/category/evoHeader/2022/eve-kategorie-bilder-humor-v2.jpg-image.jpg",
    link: "/categories/comedy",
  },
  {
    title: "Musical",
    imgSrc:
      "https://www.eventim.de/obj/media/DE-eventim/teaser/category/evoHeader/2022/eve-kategorie-bilder-musical-v3.jpg",
    link: "/categories/musical",
  },
  {
    title: "Show",
    imgSrc:
      "https://example.com/path-https://www.eventim.de/obj/media/DE-eventim/teaser/category/evoHeader/freizeit-genre-header-1440x244-05.jpg-show-image.jpg",
    link: "/categories/show",
  },
  {
    title: "Theater",
    imgSrc: "https://example.com/path-to-theater-image.jpg",
    link: "/categories/theater",
  },
  {
    title: "Konzert",
    imgSrc:
      "https://www.eventim.de/obj/media/DE-eventim/teaser/category/evoHeader/2023/kategorie-bild-konzerte.jpg",
    link: "/categories/konzert",
  },
  {
    title: "Sport",
    imgSrc:
      "https://www.eventim.de/obj/media/DE-eventim/teaser/category/evoHeader/sport-genre-header-1440x244.jpg",
    link: "/categories/sport",
  },
  {
    title: "Kultur",
    imgSrc: "https://example.com/path-to-culture-image.jpg",
    link: "/categories/kultur",
  },
  {
    title: "Boxen & Wrestling",
    imgSrc: "https://example.com/path-to-boxing-wrestling-image.jpg",
    link: "/categories/boxen-wrestling",
  },
];

const AllEventCategorys = () => {
  return (
    <div className="">
      <Outlet />
      <div className="lg:grid md:grid-cols-5 my-4 sm:flex sm:flex-wrap sm:justify-center sm:items-center md:flex md:flex-wrap md:justify-center lg:gap-2 m-10">
        {categories.map((category, index) => (
          <Link
            to={category.link}
            key={index}
            className="border-2 p-4 text-center flex flex-col items-center rounded-lg mt-3 hover:bg-gray-100 hover:shadow-lg transition duration-500 ease-in-out"
          >
            <img src={category.imgSrc} alt={category.title} className="" />

            <span className="text-orange-800 text-center ">
              {category.title}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AllEventCategorys;
