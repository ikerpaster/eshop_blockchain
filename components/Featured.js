import React from "react";
import ImageSlider from "./ImageSlider";
import { SliderData } from "./SliderData";

const Featured = () => {
  const styles = {
    container: `h-[150px] md:h-[400px] lg:h-[400px] w-full flex p-[0px] flex-col`,
  };
  return (
    <div className={styles.container}>
      <ImageSlider slides={SliderData} />
    </div>
  );
};

export default Featured;
