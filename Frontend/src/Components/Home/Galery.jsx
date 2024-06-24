import React, { useEffect, useState } from "react";
import axios from "axios";

export default function MasonryGridGallery() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/dashboard/event"
        );
        const imageUrls = response.data.map((event) => event.bild);
        setImages(imageUrls);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4 my-4 border-r-4 border-t-4 p-4 border-orange-300 ">
      <div className="grid gap-4">
        <div>
          <img
            className="h-[150px] w-[500px] rounded-lg object-cover object-center"
            src={images[0]}
            alt="gallery-photo"
          />
        </div>
        <div>
          <img
            className="h-[400px] w-[500px] rounded-lg object-cover object-center "
            src={images[1]}
            alt="gallery-photo"
          />
        </div>
        <div>
          <img
            className="h-[200px] w-[500px] rounded-lg object-cover object-center"
            src={images[2]}
            alt="gallery-photo"
          />
        </div>
      </div>
      <div className="grid gap-4">
        <div>
          <img
            className="h-[300px] max-w-full rounded-lg object-cover object-center"
            src={images[3]}
            alt="gallery-photo"
          />
        </div>
        <div>
          <img
            className="h-[150px] w-[500px] rounded-lg object-cover object-center"
            src={images[4]}
            alt="gallery-photo"
          />
        </div>
        <div>
          <img
            className="h-[300px] w-[500px] rounded-lg object-cover object-center "
            src={images[5]}
            alt="gallery-photo"
          />
        </div>
      </div>
      <div className="grid gap-4">
        <div>
          <img
            className="h-[180px] w-[500px] rounded-lg object-cover object-center"
            src={images[6]}
            alt="gallery-photo"
          />
        </div>
        <div>
          <img
            className="h-[390px] w-[500px] rounded-lg object-cover object-center "
            src={images[7]}
            alt="gallery-photo"
          />
        </div>
        <div>
          <img
            className="h-[190px] w-[500px] rounded-lg object-cover object-center"
            src={images[8]}
            alt="gallery-photo"
          />
        </div>
      </div>
      <div className="grid gap-4">
        <div>
          <img
            className="h-[390px] w-[500px] rounded-lg object-cover object-center "
            src={images[9]}
            alt="gallery-photo"
          />
        </div>
        <div>
          <img
            className="h-[380px] w-[500px] rounded-lg object-cover object-center "
            src={images[10]}
            alt="gallery-photo"
          />
        </div>
      </div>
    </div>
  );
}
