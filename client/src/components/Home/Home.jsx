import styles from "./Home.module.css";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Cards from "../Cards/Cards";
import { useDispatch, useSelector } from "react-redux";
import {
  filterTemperament,
  getDogs,
  orderName,
  orderWeight,
  filterOrigin,
  getTemperaments,
} from "../../redux/actions";
import SearchBar from "../SearchBar/SearchBar";

const getSavedPage = () => {
  const savedPage = localStorage.getItem("currentPage");
  return savedPage ? parseInt(savedPage) : 0;
};

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const [selectedTemperament, setSelectedTemperament] = useState("");
  const [selectedOrigin, setSelectedOrigin] = useState("");

  const dispatch = useDispatch();
  const temperamentsState = useSelector((state) => state.temperaments);
  const dogs = useSelector((state) => state.allDogs);

  const handleFilterOrigin = (event) => {
    const selectedValue = event.target.value;
    dispatch(filterOrigin(selectedValue));
  };
  useEffect(() => {
    const savedTemperament = localStorage.getItem("selectedTemperament");
    if (savedTemperament) {
      setSelectedTemperament(savedTemperament);
    }
    !dogs.length && dispatch(getDogs());
    dispatch(getTemperaments());
  }, [dispatch, dogs]);

  const savedOrigin = localStorage.getItem("selectedOrigin");
  if (savedOrigin) {
    setSelectedOrigin(savedOrigin);
  }

  const [currentPage, setCurrentPage] = useState(getSavedPage());
  const cardsPerPage = 8;
  const pageCount = Math.ceil(dogs.length / cardsPerPage);

  useEffect(() => {
    const savedPage = getSavedPage();
    if (location.pathname === "/home" && savedPage !== currentPage) {
      setCurrentPage(savedPage);
    }
  }, [location.pathname, currentPage]);

  // Función para cambiar de página
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    localStorage.setItem("currentPage", pageNumber.toString());
  };

  const handleFilter = (event) => {
    dispatch(filterTemperament(event.target.value));
  };

  const filteredDogs = dogs.filter((dog) => {
    return dog.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const handleSearch = (value) => {
    setSearchQuery(value);
  };

  const indexOfLastCard = (currentPage + 1) * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = filteredDogs.slice(indexOfFirstCard, indexOfLastCard);

  const handleOrderName = (event) => {
    const name = event.target.value;
    dispatch(orderName(name));
  };
  const handleOrderPeso = (event) => {
    const weight = event.target.value;
    dispatch(orderWeight(weight));
  };
  return (
    <div>
      <h1>DOGS APP</h1>
      <div className={styles.search}>
        <SearchBar onSearch={handleSearch} />
      </div>
      <select
        className={styles.select4}
        onChange={handleFilterOrigin}
        defaultValue=""
      >
        <option value="" disabled>
          Origen
        </option>
        <option value="all">Todos</option>
        <option value="api">API</option>
        <option value="Database">Base de datos</option>
      </select>
      <select className={styles.select1} onChange={handleOrderName}>
        <option value="">Ordenar</option>
        <option value="A">A-Z</option>
        <option value="D">Z-A</option>
      </select>
      <select className={styles.select3} onChange={handleOrderPeso}>
        <option value="">Peso</option>
        <option value="A">Pequeño</option>
        <option value="D">Grande</option>
      </select>
      <select className={styles.select2} onChange={handleFilter}>
        <option key={0} value="all">
          Temperamentos
        </option>
        {temperamentsState.length
          ? temperamentsState.map((t) => (
              <option key={t.id} value={t.nombre}>
                {t.nombre}
              </option>
            ))
          : null}
      </select>
      <div className={styles.pagination}>
        {Array.from({ length: pageCount }).map((_, index) => (
          <button
            key={index}
            className={`${styles.pageButton} ${
              currentPage === index ? "active" : ""
            }`}
            onClick={() => handlePageChange(index)}
          >
            {index + 1}
          </button>
        ))}
      </div>
      <div className={styles.navigationButtons}>
        <button
          className={styles.navigationButton}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 0}
        >
          Anterior
        </button>
        <button
          className={styles.navigationButton}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === pageCount - 1}
        >
          Siguiente
        </button>
      </div>
      <Cards
        combinedDogs={currentCards}
        selectedTemperament={selectedTemperament}
      />
    </div>
  );
};
export default Home;
