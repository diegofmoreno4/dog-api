const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const getDogs = require("../controllers/01-getDogs");
const getDogById = require("../controllers/04-getDogById");
const getDogsByName = require("../controllers/02-getDogsByName");
const getAndSaveTemperaments = require("../controllers/03-getTemperamentsDogs");
const createDog = require("../controllers/05-CreateDog");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/dogs", async (req, res) => {
  try {
    const { name } = req.query;
    let dogs;

    if (!name) {
      dogs = await getDogs(req, res);
    } else {
      dogs = await getDogsByName(name);
    }
    res.status(200).json(dogs);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los perros" });
  }
});

router.get("/temperaments", async (req, res) => {
  try {
    const temperaments = await getAndSaveTemperaments();

    res.status(200).json(temperaments);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

router.get("/dogs/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (isNaN(id)) {
      throw new Error("El ID debe ser un número");
    }
    const dog = await getDogById(id);
    res.status(200).json(dog);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

router.post("/dogs", async (req, res) => {
  try {
    const { nombre, altura, peso, años_vida, temperaments, imagen } = req.body;
    const newDog = await createDog(
      nombre,
      altura,
      peso,
      años_vida,
      temperaments,
      imagen
    );
    res.status(201).json(newDog);
  } catch (error) {
    res.status(400).json({ error: "Error al crear el perro" });
  }
});

router.post("/temperaments", async (req, res) => {
  try {
    const { nombre } = req.body;
    const newTemperament = await createTemperament(nombre);
    res.status(201).json(newTemperament);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Error al crear el temperamento" });
  }
});

module.exports = router;
