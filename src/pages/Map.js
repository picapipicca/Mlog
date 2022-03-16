import React, { Fragment } from "react";
import classes from "./Map.module.css";
import Bus from "../components/Bus/Bus";
import MapSwiper from "../components/MapSwiper";

const Map = (props) => {
  return (
    <Fragment>
      <div>
        <MapSwiper />
      </div>

      <Bus height="8vh" carNumber="sexy kingkong" />
      <Bus height="8vh" bg="black" carNumber="camel" />
      <Bus height="8vh" bg="yellow" carNumber="cat" />
    </Fragment>
  );
};

export default Map;
