import clsx from "clsx";
import PrevButton from "./PrevButton.jsx";
import NextButton from "./NextButton.jsx";
import Pages from "./Pages.jsx";
import { useRef, useState } from "react";

const images = [
  {
    src: "https://picsum.photos/id/600/600/400",
    alt: "Forest",
  },
  {
    src: "https://picsum.photos/id/100/600/400",
    alt: "Beach",
  },
  {
    src: "https://picsum.photos/id/200/600/400",
    alt: "Yak",
  },
  {
    src: "https://picsum.photos/id/300/600/400",
    alt: "Hay",
  },
  {
    src: "https://picsum.photos/id/400/600/400",
    alt: "Plants",
  },
  {
    src: "https://picsum.photos/id/500/600/400",
    alt: "Building",
  },
];

const getNextPage = (page) => {
  if (page === images.length) {
    return 1;
  } else {
    return page + 1;
  }
};

const getPrevPage = (page) => {
  if (page === 1) {
    return images.length;
  } else {
    return page - 1;
  }
};

const ImageCarousel = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [prevCurrentPage, setPrevCurrentPage] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isSlidingRight, setIsSlidingRight] = useState(false);
  const [isSlidingLeft, setIsSlidingLeft] = useState(false);
  const [nextPage, setNextPage] = useState(getNextPage(currentPage));
  const [prevPage, setPrevPage] = useState(getPrevPage(currentPage));

  const slideableEl = useRef(null);

  const handleSelect = (page) => {
    if (page > currentPage) {
      setCurrentPage(page);
      setIsSlidingRight(true);
      setIsTransitioning(true);
      setNextPage(page);

      slideableEl.current.addEventListener(
        "transitionend",
        () => {
          setPrevCurrentPage(page);
          setIsSlidingRight(false);
          setIsTransitioning(false);
        },
        {
          once: true,
        },
      );
    } else if (page < currentPage) {
      setCurrentPage(page);
      setIsSlidingLeft(true);
      setIsTransitioning(true);
      setPrevPage(page);

      slideableEl.current.addEventListener(
        "transitionend",
        () => {
          setPrevCurrentPage(page);
          setIsSlidingLeft(false);
          setIsTransitioning(false);
        },
        {
          once: true,
        },
      );
    }
  };

  const handlePrev = () => {
    setIsSlidingLeft(true);
    setIsTransitioning(true);
    setCurrentPage(getPrevPage(currentPage));
    setPrevPage(getPrevPage(currentPage));

    slideableEl.current.addEventListener(
      "transitionend",
      () => {
        setPrevCurrentPage(getPrevPage(prevCurrentPage));
        setIsSlidingLeft(false);
        setIsTransitioning(false);
      },
      {
        once: true,
      },
    );
  };

  const handleNext = () => {
    setIsSlidingRight(true);
    setIsTransitioning(true);
    setCurrentPage(getNextPage(currentPage));
    setNextPage(getNextPage(currentPage));

    slideableEl.current.addEventListener(
      "transitionend",
      () => {
        setPrevCurrentPage(getNextPage(prevCurrentPage));
        setIsSlidingRight(false);
        setIsTransitioning(false);
      },
      {
        once: true,
      },
    );
  };

  const getCurrentImage = () => {
    if (isTransitioning) {
      return images[prevCurrentPage - 1];
    } else {
      return images[currentPage - 1];
    }
  };

  const getPrevImage = () => {
    return images[prevPage - 1];
  };

  const getNextImage = () => {
    return images[nextPage - 1];
  };

  return (
    <div className="w-[600px] h-[400px] overflow-hidden">
      <div className={clsx("relative w-full h-full")}>
        <div
          ref={slideableEl}
          className={clsx("relative w-full h-full left-0", {
            "duration-[600ms] left-[-100%] transition-all ease-linear": isSlidingRight,
            "duration-[600ms] left-[100%] transition-all ease-linear": isSlidingLeft,
          })}
        >
          <div className={clsx("w-full h-full", {})}>
            <img
              key={getCurrentImage().src}
              className={clsx("w-full h-full")}
              src={getCurrentImage().src}
              alt={getCurrentImage().alt}
            />
          </div>
          <div className={clsx("w-full h-full absolute top-0 left-[100%]", {})}>
            {isSlidingRight && (
              <img
                key={getNextImage().src}
                alt={getNextImage().alt}
                className={clsx("w-full h-full")}
                src={getNextImage().src}
              />
            )}
          </div>
          <div className={clsx("w-full h-full absolute top-0 right-[100%]", {})}>
            {isSlidingLeft && (
              <img
                key={getPrevImage().src}
                alt={getPrevImage().alt}
                className={clsx("w-full h-full")}
                src={getPrevImage().src}
              />
            )}
          </div>
        </div>

        <PrevButton disabled={isTransitioning} onClick={handlePrev} />
        <NextButton disabled={isTransitioning} onClick={handleNext} />
        <Pages disabled={isTransitioning} count={images.length} selected={currentPage} onSelect={handleSelect} />
      </div>
    </div>
  );
};

export default ImageCarousel;
