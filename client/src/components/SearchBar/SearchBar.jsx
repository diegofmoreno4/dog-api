import styles from './SearchBar.module.css';
import React from 'react';

export default function SearchBar(props) {
  const handleChange = (event) => {
    const { value } = event.target;
    props.onSearch(value);
  };

  return (
    <div className={styles.navbar}>
      <input type="search" placeholder="Buscar Raza            🔎" onChange={handleChange} />
      <button onClick={() => props.onSearch('')}>Limpiar</button>
    </div>
  );
}





 