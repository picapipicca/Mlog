import React, { Fragment,useRef } from "react";

import classes from '../pages/Map.module.css';
import img_1 from "../assets/1.jpeg";
import img_2 from "../assets/2.jpeg";
import img_3 from "../assets/3.jpeg";
import img_4 from "../assets/4.jpeg";
import img_5 from "../assets/5.jpeg";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay ,Keyboard,A11y} from "swiper"; 

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const MapSwiper = () => {
 const buttonRight=useRef(null);
 const buttonLeft=useRef(null);

  return (
      <Swiper
      className={classes.swiper}
      modules={[Navigation, Pagination, Autoplay, A11y]}
      spaceBetween={50}
      slidesPerView={1}
      navigation={{
        nextEl:buttonRight.current,
        prevEl:buttonLeft.current,
      }}
      loop={true}
      pagination={{ clickable: true}}
      // autoplay={{ delay: 3000 }}
      grabCursor={true}
  
      onSwiper={(swiper) =>{
        // Delay execution for the refs to be defined
        setTimeout(() => {
          // Override prevEl & nextEl now that refs are defined
          swiper.params.navigation.prevEl = buttonLeft.current
          swiper.params.navigation.nextEl = buttonRight.current

          // Re-init navigation
          // swiper.navigation.destroy()
          swiper.navigation.init()
          // swiper.navigation.update()
        })
      }}
    >
      <div ref={buttonLeft} className={classes.swiper__left}></div>
      <div ref={buttonRight} className={classes.swiper__right}></div>
      <SwiperSlide><img alt='' src={img_1}/></SwiperSlide>
      <SwiperSlide><img alt='' src={img_2}/></SwiperSlide>
      <SwiperSlide><img alt='' src={img_3}/></SwiperSlide>
      <SwiperSlide><img alt='' src={img_4}/></SwiperSlide>
      <SwiperSlide><img alt='' src={img_5}/></SwiperSlide>
      

    </Swiper>
  );
};

export default MapSwiper;
