const axios = require("axios");
const { Sequelize } = require("sequelize");
require("dotenv").config();
const { API_KEY } = process.env;

const { Dog } = require("../db");

const Url = "https://api.thedogapi.com/v1/breeds/search";

const getDogsByName = async (name) => {
  try {
    const response = await axios.get(`${Url}?q=${name}`);
    const apiDogs = response.data;

    if (apiDogs.length > 0) {
      // Si se encuentran razas de perros en la API, retornar los datos de la API
      return apiDogs;
    } else {
      // Si no se encuentran razas de perros en la API, buscar en la base de datos local
      const dbDogs = await Dog.findAll({
        where: {
          nombre: {
            [Sequelize.Op.iLike]: `%${name}%`,
          },
        },
      });

      if (dbDogs.length > 0) {
        // Si se encuentran razas de perros en la base de datos local, retornar los datos de la base de datos
        return dbDogs;
      } else {
        throw new Error("No se encontraron razas de perros con el nombre especificado en la base de datos ni en la API");
      }
    }
  } catch (error) {
    throw new Error("Error al obtener las razas de perros");
  }
};

module.exports = getDogsByName;


