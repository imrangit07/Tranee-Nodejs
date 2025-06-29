const { DataTypes } = require('sequelize');
const sequilize = require('../config/database');

const  task = sequilize.define('task', {
   userId:{
    type:DataTypes.INTEGER,
   },
   taskName:{
    type:DataTypes.STRING
   },
   taskType:{
    type:DataTypes.STRING
   },
 
}
)

module.exports = task