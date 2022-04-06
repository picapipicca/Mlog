import React from "react";
import classes from "./Map.module.css";
import Footer from "../components/Footer";
import MapSwiper from "../components/MapSwiper";
import logo1 from "../assets/logo1.jpeg";
import logo2 from "../assets/logo2.jpeg";
import logo3 from "../assets/logo3.jpeg";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import MapPost from "../components/Log/MapPost";

import { Button } from "../element/index";
import { actionCreators as logActions } from "../redux/modules/log";
import { useSelector, useDispatch } from "react-redux";

const Map = (props) => {
  const { history } = props;
  const dispatch = useDispatch();
  const post_list = useSelector((state) => state.log.post_list);
  const paging = useSelector((state) => state.log.paging);

  React.useEffect(() => {
    if (post_list.length < 2) {
      dispatch(logActions.getRandomPostFirebase());
    }
  }, []);

  const renewPostHandler = () => {
    if (!is_next) return;
    dispatch(logActions.getRandomPostFirebase(paging.next));
  };
  const is_next = paging.next ? true : false;

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
          <div className={classes.swiper__content}>
            <MapSwiper />
          </div>
        </div>
        <section className={classes.logs}>
          <h4>Log new Arrivals!</h4>
          {is_next && (
            <Button
              className={classes.btn__redirect}
              _onClick={renewPostHandler}
            >
              <AutorenewIcon />
            </Button>
          )}
          {is_next ? (
            <div className={classes.logs__wrapper}>
              {post_list &&
                post_list?.map((p, idx) => <MapPost key={p.id} {...p} />)}
              <span className={classes.log__intro}>
                다른사람들의 로그를 둘러보세요! 때론 다른사람들의 여러가지
                이야기에 공감하는것이 자신을 위로하기도 한답니다 :){" "}
              </span>
            </div>
          ) : (
            <div className={classes.logs__wrapper_none}>
              <img src={logo1} alt="logo" />
              <img src={logo2} alt="logo" />
              <img src={logo3} alt="logo" />

              <span className={classes.log__intro}>
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    history.push("/write");
                  }}
                >
                  {" "}
                  오늘 준비된 로그는 여기까지에요! 이제 자신의 로그를 쓰러
                  가볼까요? :)
                </div>
              </span>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
};
Map.defaultProps = {
  image_url: { logo1 },
};
export default Map;
