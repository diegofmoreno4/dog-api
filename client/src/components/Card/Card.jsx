import React from "react";
import styles from "./Card.module.css";
import { Link } from "react-router-dom";

const Card = (props) => {
  const { id, name, temperament, image, weight } = props;
  const imageUrl = image && image.url ? image.url : image;
  const WeightValidation = weight.imperial ? weight.imperial : weight;

  return (
    <div className={styles.cardItem}>
      <Link to={`/dogs/${id}`}>
        <img className={styles.img} src={imageUrl} alt="not found" />
      </Link>
      <h1 className={styles.name}>{name}</h1>
      <h3>Temperamento: {temperament}</h3>
      <h2>Peso: {WeightValidation} Kg</h2>
    </div>
  );
};

export default Card;
