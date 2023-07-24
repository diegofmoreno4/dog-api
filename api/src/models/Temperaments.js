const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  // Defino el modelo Temperaments
  sequelize.define("temperaments", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
