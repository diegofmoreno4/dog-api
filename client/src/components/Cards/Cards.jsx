import React from "react";
import Card from "../Card/Card"
import styles from "./Cards.module.css"


const Cards = (props) => {
  const { combinedDogs } = props;
  return (
    <div className={styles.cardItem}>
      {combinedDogs.map((dog) => {
        return (
          <Card
            key={dog.id}
            id={dog.id}
            name={dog.name}
            temperament={dog.temperament}
            weight={dog.weight}
            image={dog.image}
          />
        );
      })}
    </div>
  );
};

export default Cards;
