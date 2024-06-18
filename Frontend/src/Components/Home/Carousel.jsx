import { Link, Outlet } from "react-router-dom";
import { Carousel, Typography, Button } from "@material-tailwind/react";

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
    <Carousel className="rounded-xl">
      {cities.map((city, index) => (
        <div
          key={index}
          className="relative h-full w-full flex items-center p-2 "
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
            <div className="text-center px-16">
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
                className="mb-4 opacity-80  "
              >
                Die coolsten Events in {city.name} bieten bieten unvergessliche
                Erlebnisse und Kultur.
              </Typography>
              <div className="flex justify-center gap-2">
                <Button size="sm" color="white" as={Link} to={city.link}>
                  Explore
                </Button>
              </div>
            </div>
          </div>
          <div className="w-1/5 h-full">
            <img
              src={city.imgSrc}
              alt={city.name}
              className="h-full w-full object-cover rounded-xl "
              style={{
                maxWidth: "250px",
                height: "auto",
                boxShadow: "0px 20px 40px rgba(255, 255, 255, 0.8)",
              }}
            />
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
