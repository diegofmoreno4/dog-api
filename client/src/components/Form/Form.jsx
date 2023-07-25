import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Form.module.css";
import { getTemperaments } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";

const Form = () => {
  const [isFormValid, setIsFormValid] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  const temperamentosState = useSelector((state) => state.temperaments);

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

    if (Object.keys(errors).length > 0) {
      setIsFormValid(false);
      setFormErrors(errors);
      return false;
    }

    // Si no hay errores, actualizamos el estado del formulario a válido
    setIsFormValid(Object.keys(errors).length === 0);
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const handleBlur = () => {
    validateForm();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const isFormValid = validateForm();

    if (isFormValid) {
      try {
        const temperamentosIds = formData.temperamentos.map((nombre) => {
          const temperamento = temperamentosState.find(
            (temp) => temp.nombre === nombre
          );
          return temperamento.id;
        });
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
      setFormErrors({
        nombre: formErrors.nombre || "",
        alturaMinima: formErrors.altura || "",
        alturaMaxima: formErrors.altura || "",
        pesoMinimo: formErrors.peso || "",
        pesoMaximo: formErrors.peso || "",
        años_vida: formErrors.años_vida || "",
      });
    }
  };

  return (
    <div className={styles.formDiv}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
        </label>
        <div className={styles.errorMessage}>
          {formErrors.nombre && <p>{formErrors.nombre}</p>}
        </div>
        <div className={styles.altura}>
          <label>
            Altura Mínima:
            <input
              type="number"
              name="alturaMinima"
              value={formData.alturaMinima}
              onChange={handleChange}
              onBlur={handleBlur}
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
              onBlur={handleBlur}
              required
            />
          </label>
        </div>
        <div className={styles.errorMessage}>
          {formErrors.altura && <p>{formErrors.altura}</p>}
        </div>
        <div className={styles.peso}>
          <label>
            Peso Mínimo:
            <input
              type="number"
              name="pesoMinimo"
              value={formData.pesoMinimo}
              onChange={handleChange}
              onBlur={handleBlur}
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
              onBlur={handleBlur}
              required
            />
          </label>
        </div>
        <div className={styles.errorMessage}>
          {formErrors.peso && <p>{formErrors.peso}</p>}
        </div>
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
            {Array.isArray(temperamentosState) &&
              temperamentosState.map((temperamento) => (
                <div key={temperamento.id}>
                  <input
                    type="checkbox"
                    name="temperamentos"
                    value={temperamento.nombre}
                    checked={formData.temperamentos.includes(
                      temperamento.nombre
                    )}
                    onChange={handleTemperamentosChange}
                  />
                  {temperamento.nombre}
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
        <button type="submit" className={styles.button} disabled={!isFormValid}>
          Crear Nuevo Perro
        </button>
      </form>
    </div>
  );
};

export default Form;
