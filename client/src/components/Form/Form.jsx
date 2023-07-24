import React, { useState } from "react";
import axios from "axios";
import styles from "./Form.module.css";

const Form = () => {
  const temperamentosIdMap = {
    Stubborn: 1,
    Curious: 2,
    Playful: 3,
    Adventurous: 4,
    Active: 5,
    "Fun-loving": 6,
    Aloof: 7,
    Clownish: 8,
    Dignified: 9,
    Independent: 10,
    Happy: 11,
    Wild: 12,
    Hardworking: 13,
    Dutiful: 14,
    Outgoing: 15,
    Friendly: 16,
    Alert: 17,
    Confident: 18,
    Intelligent: 19,
    Courageous: 20,
    Loyal: 21,
    Brave: 22,
    Docile: 23,
    Responsive: 24,
    Composed: 25,
    Receptive: 26,
    Faithful: 27,
    Loving: 28,
    Protective: 29,
    Trainable: 30,
    Responsible: 31,
    Energetic: 32,
    Gentle: 33,
    Affectionate: 34,
    Devoted: 35,
    Assertive: 36,
    Dominant: 37,
    "Strong Willed": 38,
    Obedient: 39,
    Reserved: 40,
    Kind: 41,
    "Sweet-Tempered": 42,
    Tenacious: 43,
    Attentive: 44,
    Steady: 45,
    Bold: 46,
    Proud: 47,
    Reliable: 48,
    Fearless: 49,
    Lively: 50,
    "Self-assured": 51,
    Cautious: 52,
    Eager: 53,
    "Good-natured": 54,
    Spirited: 55,
    Companionable: 56,
    "Even Tempered": 57,
    Rugged: 58,
    Fierce: 59,
    Refined: 60,
    Joyful: 61,
    Agile: 62,
    Amiable: 63,
    Excitable: 64,
    Determined: 65,
    "Self-confidence": 66,
    Hardy: 67,
    Calm: 68,
    "Good-tempered": 69,
    Watchful: 70,
    "Hard-working": 71,
    Feisty: 72,
    Cheerful: 73,
    Sensitive: 74,
    Easygoing: 75,
    Adaptable: 76,
    Trusting: 77,
    Lovable: 78,
    Territorial: 79,
    Keen: 80,
    Familial: 81,
    Rational: 82,
    Bright: 83,
    Quick: 84,
    Powerful: 85,
    Gay: 86,
    Stable: 87,
    Quiet: 88,
    Inquisitive: 89,
    Strong: 90,
    Sociable: 91,
    Patient: 92,
    Suspicious: 93,
    "Great-hearted": 94,
    Merry: 95,
    Vocal: 96,
    Tolerant: 97,
    Mischievous: 98,
    "People-Oriented": 99,
    Bossy: 100,
    Cunning: 101,
    Athletic: 102,
    Boisterous: 103,
    Cooperative: 104,
    Trustworthy: 105,
    "Self-important": 106,
    Respectful: 107,
    Thoughtful: 108,
    Generous: 109,
    "Cat-like": 110,
    Sturdy: 111,
    Benevolent: 112,
    Clever: 113,
    Opinionated: 114,
    Aggressive: 115,
    Extroverted: 116,
    Charming: 117,
    Unflappable: 118,
    Spunky: 119,
    Diligent: 120,
    Willful: 121,
    Fast: 122,
    Vigilant: 123,
  };

  const [formData, setFormData] = useState({
    nombre: "",
    alturaMinima: "",
    alturaMaxima: "",
    pesoMinimo: "",
    pesoMaximo: "",
    años_vida: "",
    temperamentos: [],
    imagen: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUrlChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleTemperamentosChange = (event) => {
    const { name, value, checked } = event.target;
    if (checked) {
      // Si el checkbox fue marcado, agregamos el temperamento a la lista
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: [...prevFormData[name], value],
      }));
    } else {
      // Si el checkbox fue desmarcado, eliminamos el temperamento de la lista
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: prevFormData[name].filter(
          (temperamento) => temperamento !== value
        ),
      }));
    }
  };
  const [formErrors, setFormErrors] = useState({
    nombre: "",
    alturaMinima: "",
    alturaMaxima: "",
    pesoMinimo: "",
    pesoMaximo: "",
    años_vida: "",
  });

  const validateForm = () => {
    // Realiza las validaciones necesarias
    // Devuelve un objeto con los errores encontrados
    const errors = {};

    // Validar que el nombre no contenga números
    if (formData.nombre.match(/\d/)) {
      errors.nombre = "El nombre no puede contener números";
    }

    // Validar que el peso mínimo no sea mayor al máximo
    if (formData.pesoMinimo >= formData.pesoMaximo) {
      errors.peso = "El peso mínimo debe ser menor al peso máximo";
    }

    // Validar que la altura mínima no sea mayor a la máxima
    if (formData.alturaMinima >= formData.alturaMaxima) {
      errors.altura = "La altura mínima debe ser menor a la altura máxima";
    }

    return errors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const errors = validateForm();

    if (Object.keys(errors).length === 0) {
      try {
        const temperamentosIds = formData.temperamentos.map(
          (nombre) => temperamentosIdMap[nombre]
        );

        // Enviar los datos del formulario al servidor, incluyendo los ID de los temperamentos
        await axios.post("http://localhost:3001/dogs", {
          nombre: formData.nombre,
          altura: `${formData.alturaMinima} - ${formData.alturaMaxima}`,
          peso: `${formData.pesoMinimo} - ${formData.pesoMaximo}`,
          años_vida: formData.años_vida,
          temperaments: temperamentosIds,
          imagen: formData.imagen,
        });

        // Luego de enviar los datos, puedes resetear el formulario
        setFormData({
          nombre: "",
          alturaMinima: "",
          alturaMaxima: "",
          pesoMinimo: "",
          pesoMaximo: "",
          años_vida: "",
          temperamentos: [],
          imagen: "",
        });
        alert("Raza de perro creada exitosamente.");
      } catch (error) {
        alert(
          "Error al crear nueva raza de perro. Por favor, intenta nuevamente."
        );
      }
    } else {
      // Si hay errores en el formulario, muestralos
      setFormErrors(errors);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label>
        Nombre:
        <input
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          required
          />
      </label>
          {formErrors.nombre && <p>{formErrors.nombre}</p>}
      <div className={styles.altura}>
        <label>
          Altura Mínima:
          <input
            type="number"
            name="alturaMinima"
            value={formData.alturaMinima}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Altura Máxima:
          <input
            type="number"
            name="alturaMaxima"
            value={formData.alturaMaxima}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      {formErrors.altura && <p>{formErrors.altura}</p>}
      <div className={styles.peso}>
        <label>
          Peso Mínimo:
          <input
            type="number"
            name="pesoMinimo"
            value={formData.pesoMinimo}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Peso Máximo:
          <input
            type="number"
            name="pesoMaximo"
            value={formData.pesoMaximo}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      {formErrors.peso && <p>{formErrors.peso}</p>}
      <label>
        Años de Vida:
        <input
          type="text"
          name="años_vida"
          value={formData.años_vida}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        URL de la Imagen:
        <input
          type="text"
          name="imagen"
          value={formData.imagen}
          onChange={handleImageUrlChange}
          required
        />
      </label>
      <label>
        Temperamentos (selecciona uno o varios):
        <div className={styles.temperamentosContainer}>
          {Object.entries(temperamentosIdMap).map(([nombre, id]) => (
            <div key={id}>
              <input
                type="checkbox"
                name="temperamentos"
                value={nombre}
                checked={formData.temperamentos.includes(nombre)}
                onChange={handleTemperamentosChange}
              />
              {nombre}
            </div>
          ))}
        </div>
      </label>
      <div className={styles.box}>
        {formData.temperamentos.map((temperamento) => (
          <span key={temperamento} className={styles.item}>
            {temperamento}
          </span>
        ))}
      </div>
      <button type="submit" className={styles.button}>
        Crear Nuevo Perro
      </button>
    </form>
  );
};

export default Form;
