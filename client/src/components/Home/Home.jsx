import styles from "./Home.module.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Cards from "../Cards/Cards";
import { useDispatch, useSelector } from "react-redux";
import {
  filterTemperament,
  getDogs,
  orderName,
  orderWeight,
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

  const allDogsFromApi = useSelector((state) => state.allDogs);
  const dispatch = useDispatch();

  // Estado para almacenar los perros de la base de datos
  const [allDogsFromDatabase, setAllDogsFromDatabase] = useState([]);

  // Función para obtener los perros de la base de datos
  const DogsFromDatabase = async () => {
    try {
      const response = await axios.get("http://localhost:3001/dogs");
      const dogsFromDatabase = response.data.map((dog) => {
        const temperament = dog.temperamento;
        const weight = dog.peso
  

        return {
          ...dog,
          image: {
            id: dog.id,
            width: 1024,
            height: 683,
            url: dog.imagen,
          },
          weight: weight,
          temperament: temperament,
        };
      });
      setAllDogsFromDatabase(dogsFromDatabase);
    } catch (error) {
      throw new Error(error);
    }
  };
  const combinedDogs = [
    ...allDogsFromApi,
    ...allDogsFromDatabase.filter(
      (dbDog) => !allDogsFromApi.some((apiDog) => apiDog.id === dbDog.id)
    ),
  ];

  useEffect(() => {
    dispatch(getDogs());
    DogsFromDatabase();
  }, []);

  const [currentPage, setCurrentPage] = useState(getSavedPage());
  const cardsPerPage = 8;
  const pageCount = Math.ceil(combinedDogs.length / cardsPerPage);

  useEffect(() => {
    const savedPage = getSavedPage();
    if (location.pathname === "/home" && savedPage !== currentPage) {
      setCurrentPage(savedPage);
    }
  }, [location.pathname, currentPage]);

  // Función para cambiar de página
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    localStorage.setItem("currentPage", pageNumber);
  };

  const handleFilter = (event) => {
    const selectedValue = event.target.value;
  
    if (selectedValue === "All") {
      dispatch(getDogs());
    } else {
      dispatch(filterTemperament(selectedValue));
    }
    setSelectedTemperament(selectedValue);
  };

  const filteredDogs = combinedDogs.filter((dog) => {
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
        <option value="">Temperamentos</option>
        <option value="All">All</option>
        <option value="Active">Active</option>
        <option value="Adaptable">Adaptable</option>
        <option value="Adventurous">Adventurous</option>
        <option value="Affectionate">Affectionate</option>
        <option value="Aggressive">Aggressive</option>
        <option value="Agile">Agile</option>
        <option value="Alert">Alert</option>
        <option value="Aloof">Aloof</option>
        <option value="Amiable">Amiable</option>
        <option value="Assertive">Assertive</option>
        <option value="Athletic">Athletic</option>
        <option value="Attentive">Attentive</option>
        <option value="Benevolent">Benevolent</option>
        <option value="Boisterous">Boisterous</option>
        <option value="Bold">Bold</option>
        <option value="Bossy">Bossy</option>
        <option value="Brave">Brave</option>
        <option value="Bright">Bright</option>
        <option value="Bubbly">Bubbly</option>
        <option value="Calm">Calm</option>
        <option value="Cat-like">Cat-like</option>
        <option value="Cautious">Cautious</option>
        <option value="Charming">Charming</option>
        <option value="Cheerful">Cheerful</option>
        <option value="Clever">Clever</option>
        <option value="Clownish">Clownish</option>
        <option value="Companionable">Companionable</option>
        <option value="Composed">Composed</option>
        <option value="Confident">Confident</option>
        <option value="Cooperative">Cooperative</option>
        <option value="Courageous">Courageous</option>
        <option value="Cunning">Cunning</option>
        <option value="Curious">Curious</option>
        <option value="Determined">Determined</option>
        <option value="Devoted">Devoted</option>
        <option value="Dignified">Dignified</option>
        <option value="Diligent">Diligent</option>
        <option value="Docile">Docile</option>
        <option value="Dominant">Dominant</option>
        <option value="Dutiful">Dutiful</option>
        <option value="Eager">Eager</option>
        <option value="Easygoing">Easygoing</option>
        <option value="Energetic">Energetic</option>
        <option value="Even Tempered">Even Tempered</option>
        <option value="Excitable">Excitable</option>
        <option value="Extroverted">Extroverted</option>
        <option value="Faithful">Faithful</option>
        <option value="Familial">Familial</option>
        <option value="Fast">Fast</option>
        <option value="Fearless">Fearless</option>
        <option value="Feisty">Feisty</option>
        <option value="Fierce">Fierce</option>
        <option value="Friendly">Friendly</option>
        <option value="Fun-loving">Fun-loving</option>
        <option value="Gay">Gay</option>
        <option value="Generous">Generous</option>
        <option value="Gentle">Gentle</option>
        <option value="Good-natured">Good-natured</option>
        <option value="Good-tempered">Good-tempered</option>
        <option value="Great-hearted">Great-hearted</option>
        <option value="Happy">Happy</option>
        <option value="Hardworking">Hardworking</option>
        <option value="Hard-working">Hard-working</option>
        <option value="Hardy">Hardy</option>
        <option value="Independent">Independent</option>
        <option value="Inquisitive">Inquisitive</option>
        <option value="Intelligent">Intelligent</option>
        <option value="Joyful">Joyful</option>
        <option value="Keen">Keen</option>
        <option value="Kind">Kind</option>
        <option value="Lively">Lively</option>
        <option value="Lovable">Lovable</option>
        <option value="Loving">Loving</option>
        <option value="Loyal">Loyal</option>
        <option value="Merry">Merry</option>
        <option value="Mischievous">Mischievous</option>
        <option value="Obedient">Obedient</option>
        <option value="Opinionated">Opinionated</option>
        <option value="Outgoing">Outgoing</option>
        <option value="Patient">Patient</option>
        <option value="People-Oriented">People-Oriented</option>
        <option value="Playful">Playful</option>
        <option value="Powerful">Powerful</option>
        <option value="Protective">Protective</option>
        <option value="Proud">Proud</option>
        <option value="Quick">Quick</option>
        <option value="Quiet">Quiet</option>
        <option value="Rational">Rational</option>
        <option value="Receptive">Receptive</option>
        <option value="Refined">Refined</option>
        <option value="Reliable">Reliable</option>
        <option value="Reserved">Reserved</option>
        <option value="Respectful">Respectful</option>
        <option value="Responsible">Responsible</option>
        <option value="Responsive">Responsive</option>
        <option value="Rugged">Rugged</option>
        <option value="Self-assured">Self-assured</option>
        <option value="Self-confidence">Self-confidence</option>
        <option value="Self-important">Self-important</option>
        <option value="Sensitive">Sensitive</option>
        <option value="Sociable">Sociable</option>
        <option value="Spirited">Spirited</option>
        <option value="Spunky">Spunky</option>
        <option value="Stable">Stable</option>
        <option value="Steady">Steady</option>
        <option value="Strong Willed">Strong Willed</option>
        <option value="Strong">Strong</option>
        <option value="Stubborn">Stubborn</option>
        <option value="Sturdy">Sturdy</option>
        <option value="Suspicious">Suspicious</option>
        <option value="Sweet-Tempered">Sweet-Tempered</option>
        <option value="Tenacious">Tenacious</option>
        <option value="Territorial">Territorial</option>
        <option value="Thoughtful">Thoughtful</option>
        <option value="Tolerant">Tolerant</option>
        <option value="Trainable">Trainable</option>
        <option value="Trusting">Trusting</option>
        <option value="Trustworthy">Trustworthy</option>
        <option value="Unflappable">Unflappable</option>
        <option value="Vigilant">Vigilant</option>
        <option value="Vocal">Vocal</option>
        <option value="Watchful">Watchful</option>
        <option value="Wild">Wild</option>
        <option value="Willful">Willful</option>
      </select>
      <div className={styles.pagination}>
        {Array.from(Array(pageCount).keys()).map((pageNumber) => (
          <button
            key={pageNumber}
            className={currentPage === pageNumber ? "active" : ""}
            onClick={() => handlePageChange(pageNumber)}
          >
            {pageNumber + 1}
          </button>
        ))}
      </div>
      <Cards combinedDogs={currentCards} selectedTemperament={selectedTemperament}/>
    </div>
  );
};
export default Home;
