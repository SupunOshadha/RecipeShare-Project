import React from "react";
import HorizontalCardProduct from "../components/HorizontalCardProduct";
import VerticalCardProduct from "../components/VerticalCardProduct";

const Home = () => {
  return (
    <>
      <HorizontalCardProduct category={"Indian"} heading={"Indian"} />
      <VerticalCardProduct category={"Italian"} heading={"Italian"} />
      <VerticalCardProduct category={"Indian"} heading={"Indian"} />
      <VerticalCardProduct category={"French"} heading={"French "} />
      <VerticalCardProduct category={"USA"} heading={"USA"} />
      <VerticalCardProduct category={"Chinese"} heading={"Chinese"} />
      <VerticalCardProduct category={"Mexican"} heading={"Mexican"} />
      <VerticalCardProduct category={"Korean"} heading={"Korean"} />
      <VerticalCardProduct category={"Japanese"} heading={"Japanese"} />
    </>
  );
};

export default Home;
