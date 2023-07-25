const { Sequelize, DataTypes } = require("sequelize");
const defineDogModel = require("../../src/models/Dog.js");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: ":memory:",
});

defineDogModel(sequelize);
const { dog } = sequelize.models;
const attributes = dog.getAttributes();

describe("El modelo Dog", () => {
  it("Debe generar automáticamente los atributos createdAt y updatedAt", () => {
    expect(attributes["createdAt"]).toBeDefined();
    expect(attributes["updatedAt"]).toBeDefined();
  });

  describe("Los atributos del modelo...", () => {
    it("id: Un identificador único de tipo entero, con incremento automático y clave primaria.", () => {
      expect(attributes.id.type instanceof DataTypes.INTEGER).toBe(true);
      expect(attributes.id.primaryKey).toBe(true);
      expect(attributes.id.autoIncrement).toBe(true);
    });

    it("imagen: El enlace de la imagen del perro, de tipo cadena de texto y puede ser nulo.", () => {
      expect(attributes.imagen.type instanceof DataTypes.STRING).toBe(true);
      expect(attributes.imagen.allowNull).toBe(true);
    });

    it("nombre: El nombre del perro, de tipo cadena de texto y no puede ser nulo.", () => {
      expect(attributes.nombre.type instanceof DataTypes.STRING).toBe(true);
      expect(attributes.nombre.allowNull).toBe(false);
    });

    it("altura: La altura del perro, de tipo cadena de texto y no puede ser nulo.", () => {
      expect(attributes.altura.type instanceof DataTypes.STRING).toBe(true);
      expect(attributes.altura.allowNull).toBe(false);
    });

    it("peso: El peso del perro, de tipo cadena de texto y no puede ser nulo.", () => {
      expect(attributes.peso.type instanceof DataTypes.STRING).toBe(true);
      expect(attributes.peso.allowNull).toBe(false);
    });

    it("años_vida: Los años de vida del perro, de tipo cadena de texto y no puede ser nulo.", () => {
      expect(attributes.años_vida.type instanceof DataTypes.STRING).toBe(true);
      expect(attributes.años_vida.allowNull).toBe(false);
    });

    it("CreadoDatabase: Un indicador booleano que indica si el perro fue creado en la base de datos, con valor predeterminado en verdadero y no puede ser nulo.", () => {
      expect(attributes.CreadoDatabase.type instanceof DataTypes.BOOLEAN).toBe(
        true
      );
      expect(attributes.CreadoDatabase.defaultValue).toBe(true);
      expect(attributes.CreadoDatabase.allowNull).toBe(false);
    });
  });
});
