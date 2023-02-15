const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    id:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: true,// tiene que ser false, pero por ahora lo dejo asi
    },
    imagePreview:{
      type: DataTypes.TEXT,
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    height:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    weight:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    life_span:{
      type: DataTypes.STRING,
      allowNull: true, 
    },
    
  },
  {
    timestamps: false, // sacamos las dos ultimas columnas que muestran las fechas y hora modificaciones 
});
};
