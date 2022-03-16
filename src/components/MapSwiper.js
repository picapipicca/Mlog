import React, { Fragment } from "react";
import styled from "styled-components";
import img_1 from '../assets/1.jpeg';
import img_2 from '../assets/2.jpeg';
import img_3 from '../assets/3.jpeg';

import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const MapSwiper = (props) => {
  return (
    <Fragment>
      <SwiperSpace>
      <Swiper
        className='swiper'
        slidesOffsetBefore={24}
        slidesOffsetAfter={24}
        slidesPerView={1}
        spaceBetween={30}
        autoplay={{
          'delay': 2000,
          'disableOnInteraction': false
        }}
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
            centeredSlides: true,
          },
          500: {
            slidesOffsetBefore: 16,
            slidesPerView: 1,
            spaceBetween: 8,
            centeredSlides: true,
          },
        }}
      >
          <SwiperSlide> <img style={{objectFit:'contain' ,width:'60vw',height:'40vh'}} src={img_1} alt='img'/></SwiperSlide>
          <SwiperSlide>  <img style={{objectFit:'contain' ,width:'60vw',height:'40vh'}} src={img_2} alt='img'/></SwiperSlide>
          <SwiperSlide>  <img style={{objectFit:'contain' ,width:'60vw',height:'40vh'}} src={img_3} alt='img'/></SwiperSlide>
          <SwiperSlide>  <img style={{objectFit:'contain' ,width:'60vw',height:'40vh'}} src={img_1} alt='img'/></SwiperSlide>
        </Swiper>
      </SwiperSpace>
    </Fragment>
  );
};
const SwiperSpace = styled.div`
width: 40vw;
margin:auto;
height:40vh;
`;
export default MapSwiper;
