const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id:{
      type:DataTypes.UUID,
      defaultValue:DataTypes.UUIDV4,
      allowNull:false,
      primaryKey:true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description:{
      type:DataTypes.TEXT,
      allowNull:false
    },
    released:{
      type:DataTypes.DATEONLY
    },
    rating:{
      type:DataTypes.FLOAT,
      validate:{
        isFloat:true
      }
    },
    platforms:{
      type:DataTypes.ARRAY(DataTypes.JSON),
      allowNull:false
    },
    image:{
      type:DataTypes.TEXT,
      defaultValue:''
    }
  },{
    timestamps:false
  });
};
