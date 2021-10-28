const { DataTypes,Sequelize } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipes', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    resumen:{
      type:DataTypes.STRING,
      allowNull:false
    },
    puntuacion:{
      type:DataTypes.INTEGER
    },
    level:{
      type:DataTypes.INTEGER
    },
    step:{
      type:DataTypes.STRING
    },
    createdInBd:{
      type:DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue:true
    }
  });
};
