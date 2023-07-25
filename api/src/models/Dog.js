const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("dog", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement:true,
      primaryKey: true,
      value: 265,
    },
    imagen: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    altura: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    peso: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    años_vida: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    CreadoDatabase: { 
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  });
};
