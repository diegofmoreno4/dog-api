import React from "react";
import { Link } from "react-router-dom";
import styles from "./Landing.module.css";

import reactLogo from "../../logos/react-logo.png";
import nodeLogo from "../../logos/node-logo.png";
import expressLogo from "../../logos/express-logo.png";
import postgresLogo from "../../logos/postgres-logo.png";
import sequelizeLogo from "../../logos/sequelize-logo.png";

const Landing = () => {
  return (
    <div className={styles.landingContainer}>
      <h1>Bienvenidos a mi Proyecto Individual de Dogs</h1>
      <p>En este proyecto, hemos utilizado las siguientes herramientas:</p>
      <ul className={styles.toolsList}>
        <li>
          <img src={reactLogo} alt="React" />
          React
        </li>
        <li>
          <img src={nodeLogo} alt="Node.js" />
          Node.js
        </li>
        <li>
          <img src={expressLogo} alt="Express" />
          Express
        </li>
        <li>
          <img src={postgresLogo} alt="PostgreSQL" />
          PostgreSQL
        </li>
        <li>
          <img src={sequelizeLogo} alt="Sequelize" />
          Sequelize
        </li>
      </ul>
      <Link to="/home">
      <button>Entrar</button>
      </Link>
    </div>
  );
};

export default Landing;

