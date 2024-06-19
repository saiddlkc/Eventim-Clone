import { Link, Outlet } from "react-router-dom";
import { Carousel, Typography } from "@material-tailwind/react";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

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

const CarouselWithContent = () => {
  return (
    <Carousel className="container mx-auto">
      {cities.map((city, index) => (
        <div
          key={index}
          className="relative h-full w-full flex items-center p-2"
          style={{
            backgroundColor: "#00000",
            backgroundImage: `
              url('https://i.pinimg.com/originals/8e/07/80/8e078013204d0cc9876e9edbb1fd3f85.jpg'), 
              linear-gradient(180deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.4) 100%)
            `,
            backgroundBlendMode: "overlay",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="w-3/5 h-full flex justify-center items-center">
            <div className="text-center">
              <Typography
                variant="h3"
                color="white"
                className="mb-4 text-2xl md:text-3xl lg:text-4xl"
              >
                {city.name}
              </Typography>
              <Typography
                variant="lead"
                color="white"
                className="mb-4 opacity-80 text-sm md:text-base lg:text-lg"
              >
                Die coolsten Events in {city.name} bieten unvergessliche
                Erlebnisse und Kultur.
              </Typography>
              <div className="flex justify-center gap-2">
                <ArrowRightIcon className="h-5 w-5 ml-2 text-white hover:scale-105 transition-transform duration-500 ease-in-out" />
              </div>
            </div>
          </div>
          <div
            className="flex items-center justify-center w-2/5"
            style={{ height: "250px" }}
          >
            <Link to={city.link}>
              <img
                src={city.imgSrc}
                alt={city.name}
                className="h-full w-full object-cover rounded-xl transform transition-transform duration-300 hover:scale-105 hover:rotate-2"
                style={{
                  boxShadow: "0px 0px 30px 20px rgba(255, 255, 255, 0.8)",
                }}
              />
            </Link>
          </div>
        </div>
      ))}
    </Carousel>
  );
};

const CarouselWithCities = () => {
  return (
    <div>
      <Outlet />
      <CarouselWithContent />
    </div>
  );
};

export default CarouselWithCities;
