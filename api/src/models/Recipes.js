const { DataTypes,Sequelize } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipes', {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    resumen:{
      type:DataTypes.STRING,
      allowNull:false
    },
    puntiacion:{
      type:DataTypes.INTEGER
    },
    level:{
      type:DataTypes.INTEGER
    },
    step:{
      type:DataTypes.STRING
    }
  });
};
