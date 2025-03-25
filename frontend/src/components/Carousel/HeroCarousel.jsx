import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./Carousel.css";

import img1 from "./img/hero_1.png";
import img2 from "./img/hero_2.png";
import img3 from "./img/hero_3.jpg";

const images = [img1, img2, img3];

function HeroCarousel() {
  return (
    <div className="hero-carousel relative md:mt-12 lg:mt-60 pt-10">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        breakpoints={{
          320: {
            pagination: { dynamicBullets: true },
          },
          768: {
            pagination: { clickable: true },
            navigation: { enabled: true },
          },
          1024: {
            pagination: { clickable: true },
            navigation: { enabled: true },
          },
        }}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <img
              src={image}
              alt={`Hero Image ${index + 1}`}
              className="carousel-image"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/80 to-transparent z-20"></div>

      <div className="absolute inset-0 flex items-center justify-center z-30">
        <Link
          to="/all-products"
          className="bg-[#fc9319] text-white px-6 py-2 rounded-lg hover:bg-white hover:text-[#fc9319] hover:border-[#fc9319] border-2 border-transparent transition-all duration-300 font-bold text-sm md:text-base lg:text-lg"
        >
          Shop Now
        </Link>
      </div>
    </div>
  );
}

export default HeroCarousel;