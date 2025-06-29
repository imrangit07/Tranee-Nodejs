const user =require("./userModel");
const task =require("./taskModel");

user.hasMany(task,{
    foreignKey:"userId",
    onDelete:"CASCADE"
});

task.belongsTo(user,{
    foreignKey:'userId'
})

module.exports = {user,task}