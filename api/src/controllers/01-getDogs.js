const axios = require("axios");
const { Dog, Temperaments } = require("../db");
require("dotenv").config();
const { API_KEY } = process.env;

const Url = `https://api.thedogapi.com/v1/breeds/?api_key=${API_KEY}`;

const getDogs = async () => {
  try {
    // Obtener los datos de la API externa
    const { data: apiData } = await axios.get(Url);

    // Obtener los datos de la base de datos local con los temperamentos asociados
    const dbData = await Dog.findAll({
      include: {
        model: Temperaments,
        attributes: ["nombre"], 
        through: {
          attributes: [], 
        },
      },
    });

    // Combinar los datos de la API con los datos de la base de datos local
    const combinedData = [...apiData];

    // Agregar los perros de la base de datos local si existen
    if (dbData.length > 0) {
      dbData.forEach((dbDog) => {
        const existingDog = combinedData.find(
          (dog) => dog.name === dbDog.nombre
        );
        if (!existingDog) {
          const temperamentNames = dbDog.temperaments.map(
            (temperament) => temperament.nombre
          );
          combinedData.push({
            id: dbDog.id,
            name: dbDog.nombre,
            height: dbDog.altura,
            weight: dbDog.peso,
            life_span: dbDog.años_vida,
            image: dbDog.imagen,
            temperament: temperamentNames.join(", "),
            CreadoDatabase:dbDog.CreadoDatabase
          });
        }
      });
    }

    return combinedData;
  } catch (error) {
    throw new Error("Error al obtener los perros");
  }
};

module.exports = getDogs;
