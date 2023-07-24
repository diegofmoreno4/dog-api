import { Link } from "react-router-dom";
import styles from "./Nav.module.css";

const Nav = () => {
  return (
    <div className={styles.navbar}>
      <Link to="/form">
        <button className={styles.button1}>Crear Perro</button>
      </Link>
      <Link to="/home">
        <button className={styles.button2}>Home</button>
      </Link>
    </div>
  );
};

export default Nav;
