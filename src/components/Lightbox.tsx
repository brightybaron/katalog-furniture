import { useState, type MouseEvent } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

type Image = {
  url: string;
};

type LightboxProps = {
  images: Image[];
  title: string;
};

const LightboxGaleri = ({ images, title }: LightboxProps) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const closeLightbox = () => {
    setIsOpen(false);
  };

  const gotoPrevious = () => {
    setCurrentIndex((currentIndex + images.length - 1) % images.length);
  };

  const gotoNext = () => {
    setCurrentIndex((currentIndex + 1) % images.length);
  };

  const handleOverlayClick = (event: MouseEvent<HTMLDivElement>) => {
    if (
      !event.currentTarget.closest(".lightbox-overlay") &&
      !event.currentTarget.closest("button")
    ) {
      closeLightbox();
    }
  };

  return (
    <>
      {images.map((image, index) => (
        <div key={index} className="max-h-full aspect-square mx-auto">
          <img
            className="block h-full aspect-square object-cover rounded mx-auto transition-all duration-200 hover:opacity-50 cursor-pointer"
            src={`${image.url}`}
            alt={`${title} ${index + 1}`}
            onClick={() => openLightbox(index)}
          />
        </div>
      ))}
      {isOpen && (
        <div
          className="lightbox-overlay fixed top-0 left-0 w-full h-screen bg-[rgba(0,0,0,0.8)] flex justify-center items-center z-50"
          onClick={handleOverlayClick}
        >
          <div className="lightbox-container p-5 rounded-xl shadow w-[90%] max-w-[800px] my-8 mx-auto">
            <img
              className="w-full h-screen object-contain"
              src={`${images[currentIndex].url}`}
              alt={`${title} ${currentIndex + 1}`}
            />
          </div>
          <div className="absolute w-full h-screen">
            <button
              className=" text-white border-none py-2 px-4 cursor-pointer hover:bg-red-400 active:bg-[#555555] absolute top-3 right-3 rounded-md font-semibold bg-red-600"
              onClick={closeLightbox}
            >
              Close
            </button>
            {images.length > 1 && (
              <>
                <button
                  className=" text-white border-none p-2 cursor-pointer hover:bg-[#444444] active:bg-[#555555] absolute top-[47%] sm:left-8 left-0 rounded-md font-bold"
                  onClick={gotoPrevious}
                >
                  <BsChevronLeft size={"1.5rem"} />
                </button>
                <button
                  className=" text-white border-none p-2 cursor-pointer hover:bg-[#444444] active:bg-[#555555] absolute top-[47%] sm:right-8 right-0 rounded-md font-bold"
                  onClick={gotoNext}
                >
                  <BsChevronRight size={"1.5rem"} />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default LightboxGaleri;
