import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const MapSwiper = (props) => {
  return (
    <div>
      <Swiper
        className='swiper'
        slidesOffsetBefore={24}
        slidesOffsetAfter={24}
        slidesPerView={3}
        spaceBetween={8}
        initialSlide={1}
        centeredSlides={true}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        scrollbar={{ draggable: true, dragSize: 24 }}
        breakpoints={{
          0: {
            slidesOffsetBefore: 0,
            slidesPerView: 1,
            spaceBetween: 8,
            centeredSlides: false,
          },
          500: {
            slidesOffsetBefore: 16,
            slidesPerView: 2,
            spaceBetween: 8,
            centeredSlides: false,
          },
        }}
      />
      <SwiperSlide>slide 1</SwiperSlide>
      <SwiperSlide>slide 2</SwiperSlide>
      <SwiperSlide>slide 3</SwiperSlide>
      <SwiperSlide>slide 4</SwiperSlide>
    </div>
  );
};

export default MapSwiper;
