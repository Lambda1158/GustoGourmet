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
    summary:{
      type:DataTypes.STRING,
      allowNull:false
    },
    title:{
      type: DataTypes.STRING
    },
    puntuacion:{
      type:DataTypes.INTEGER
    },
    healthScore:{
      type:DataTypes.INTEGER
    },
    step:{
      type:DataTypes.STRING
    },
    dishTypes:{
      type:DataTypes.STRING
    },
    createdInBd:{
      type:DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue:true
    },
    image:{
      type: DataTypes.STRING,
    }
  });
};
