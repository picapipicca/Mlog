import React from "react";
import classes from "./Map.module.css";
import Footer from "../components/Footer";
// import Bus from "../components/Bus/Bus";
import MapSwiper from "../components/MapSwiper";

const Map = (props) => {
  return (
    <div className={classes.wrap}>
      <main>
        <h1>
          Mlog is a carefully curated website, it can be private & social space
          which depends on you. Take care your mood today!
        </h1>
        <h6>
          Mlog 는 아주 섬세하게 만들어진 웹사이트 입니다. 아주 개인적이고도
          사회적인 공간이 될수 있습니다. 당신의 오늘 하루의 기분을 채워보세요!
        </h6>
        <div className={classes.swiper}>
          <div className={classes.swiper__content}><MapSwiper/></div>
        </div>
        <section className={classes.logs}>
          <h4>Log new Arrivals!</h4>
          <div className={classes.logs__wrapper}>
          <article className={classes.log}>
              <div className={classes.log__photo}></div>
              <span className={classes.log__title}>오늘의 기분은?</span>
              <div className={classes.log__content}>
                <span>2022-01-06</span>
                <span>comment 5</span>
              </div>
            </article>
            <article className={classes.log}>
              <div className={classes.log__photo}></div>
              <span className={classes.log__title}>오늘의 기분은?</span>
              <div className={classes.log__content}>
                <span>2022-01-06</span>
                <span>comment 5</span>
              </div>
            </article>
           <article className={classes.log}>
              <div className={classes.log__photo}></div>
              <span className={classes.log__title}>오늘의 기분은?</span>
              <div className={classes.log__content}>
                <span>2022-01-06</span>
                <span>comment 5</span>
              </div>
            </article>
            <article className={classes.log}>
              <div className={classes.log__photo}></div>
              <span className={classes.log__title}>오늘의 기분은?</span>
              <div className={classes.log__content}>
                <span>2022-01-06</span>
                <span>comment 5</span>
              </div>
            </article>
            <span className={classes.log__intro}>
              다른사람들의 로그를 둘러보세요! 때론 다른사람들의 여러가지
              이야기에 공감하는것이 자신을 위로하기도 한답니다 :){" "}
            </span>
          </div>
        </section>
      </main>
      <Footer/>
    </div>
  );
};

export default Map;
