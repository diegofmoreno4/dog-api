import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { cleanDetail, getDogsDetail } from "../../redux/actions";
import React, { useEffect } from "react";
import styles from "./Detail.module.css";

const Detail = () => {
  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    dispatch(getDogsDetail(params.id));

    //Cuando el componente se desmonte se limpia el estado
    return () => {
      dispatch(cleanDetail());
    };
  }, [dispatch, params.id]);

  const {
    id,
    name,
    height,
    weight,
    life_span,
    temperament,
    reference_image_id,
    image,
    imagen,
    altura,
    peso,
    años_vida,
    nombre,
    temperaments,
  } = useSelector((state) => state.dogDetail);

  // Función para obtener la URL de la imagen del perro
  const getImageUrl = () => {
     if (imagen) {
      return imagen;
    } else if (reference_image_id) {
      return `https://cdn2.thedogapi.com/images/${reference_image_id}.jpg`;
    }
    return null;
  };

 // Función para obtener los temperamentos en formato de cadena de texto
const getTemperamentsText = () => {
  if (temperament) {
    return temperament;
  } else if (temperaments && temperaments.length > 0) {
    return temperaments.map((temperament) => temperament.nombre).join(", ");
  }
  return "Sin información de temperamentos";
};

return (
  <div className={styles.container}>
    <div className={styles.imageContainer}>
      {getImageUrl() && <img className={styles.img} src={getImageUrl()} alt="" />}
    </div>
    <div className={styles.dataContainer}>
      {id && <h1 className={styles.title}>ID: {id}</h1>}
      {nombre && <h1 className={styles.title}>Nombre: {nombre}</h1>}
      {name && <h1 className={styles.title}>Nombre: {name}</h1>}
      {altura && <h2 className={styles.info}>Altura: {altura}</h2>}
      {height && <h2 className={styles.info}>Altura: {height.imperial}</h2>}
      {peso && <h2 className={styles.info}>Peso: {peso} Kg</h2>}
      {weight && <h2 className={styles.info}>Peso: {weight.imperial} Kg</h2>}
      {años_vida && <h2 className={styles.info}>Años de vida: {años_vida}</h2>}
      {life_span && <h2 className={styles.info}>Años de vida: {life_span}</h2>}
      <h2 className={styles.temperaments}>Temperamentos: {getTemperamentsText()}</h2>
    </div>
  </div>
);
};

export default Detail;
