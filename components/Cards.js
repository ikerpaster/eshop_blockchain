import React, { useState, useContext, useEffect } from "react";
import Card from "./Card";
import { AmazonContext } from "../context/AmazonContext";

const Cards = ({ thCat }) => {
  const styles = {
    container: `h-full w-full `,

    cards: `grid grid-cols-2 gap-4 lg:grid-cols-5 md:grid-cols-4 `,
  };

  const { assets, wishlist } = useContext(AmazonContext);

  return (
    <div className={styles.container}>
      <div className={styles.cards}>
        {assets.map((item) => {
          let asset = item.attributes;

          return <Card key={item.id} item={item.attributes} />;
        })}
      </div>
    </div>
  );
};

export default Cards;
