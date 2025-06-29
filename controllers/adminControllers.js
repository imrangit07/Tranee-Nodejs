const user = require("../models/userModel");
const task = require("../models/taskModel")
const {validateEmail,validatePhoneNumber} = require("../utils/validation")

const home = (req, res) => {
    res.render("home")
}

const createUser = (req, res) => {
    res.render("createUser");
}

const saveUser = async (req, res) => {
    const { name, email, mobile } = req.body;

    if(!validateEmail(email)){
        return res.status(400).send('Invalid email address');
    }
    if(!validatePhoneNumber(mobile)){
        return res.status(400).send("Invalid Mobile NO")
    }
    try {
        
        const newUser = await user.create({
            name: name,
            email: email,
            mobile: mobile
        })
        console.log("user Created : ", newUser.toJSON());
        res.render("createUser");
    } catch (error) {
        res.status(500).send(error)
    }
}

const addPage = async (req, res) => {

    try {
        const users = await user.findAll({
            attributes: ['id', 'name'],
            raw: true
        })

        res.render("addTask", { users: users })
    } catch (error) {
        res.status(500).send(error)
    }
}

const addUserTask = async (req, res) => {
    const { userId, taskName, taskType } = req.body;
    console.log("this is id : " , userId);
    
    try {
        const newTask = await task.create({
            userId: userId,
            taskName: taskName,
            taskType: taskType
        })
        
        console.log("Task Created : ", newTask.toJSON());

        const users = await user.findAll({
            attributes: ['id', 'name'],
            raw: true
        })

        res.render("addTask")
    } catch (error) {
        res.status(500).send("error : ",error);
    }
}

module.exports =
{
    home,
    createUser,
    saveUser,
    addPage,
    addUserTask
};