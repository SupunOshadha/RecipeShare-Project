import React from "react";
import HorizontalCardProduct from "../components/HorizontalCardProduct";
import VerticalCardProduct from "../components/VerticalCardProduct";

const Home = () => {
  return (
    <>
      <HorizontalCardProduct category={"Sri lankan"} heading={"Sri lankan"} />
      <HorizontalCardProduct category={"Indian"} heading={"Indian"} />
      <HorizontalCardProduct category={"Italian"} heading={"Italian"} />
      <HorizontalCardProduct category={"French"} heading={"French"} />
      <HorizontalCardProduct category={"USA"} heading={"USA"} />
      <HorizontalCardProduct category={"Chinese"} heading={"Chinese"} />
      <HorizontalCardProduct category={"Mexican"} heading={"Mexican"} />
      <HorizontalCardProduct category={"Korean"} heading={"Korean"} />
      <HorizontalCardProduct category={"Indian"} heading={"Indian"} />
      <HorizontalCardProduct category={"Japanese"} heading={"Japanese"} />
      
      {/* <VerticalCardProduct category={"Italian"} heading={"Italian"} />
      <VerticalCardProduct category={"Indian"} heading={"Indian"} />
      <VerticalCardProduct category={"French"} heading={"French "} />
      <VerticalCardProduct category={"USA"} heading={"USA"} />
      <VerticalCardProduct category={"Chinese"} heading={"Chinese"} />
      <VerticalCardProduct category={"Mexican"} heading={"Mexican"} />
      <VerticalCardProduct category={"Korean"} heading={"Korean"} />
      <VerticalCardProduct category={"Japanese"} heading={"Japanese"} /> */}
    </>
  );
};

export default Home;
