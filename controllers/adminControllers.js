const user = require("../models/userModel");
const task = require("../models/taskModel")
const ExcelJS = require("exceljs");
const { validateEmail, validatePhoneNumber } = require("../utils/validation")

const home = (req, res) => {
    res.render("home")
}

const createUser = (req, res) => {
    res.render("createUser");
}

const saveUser = async (req, res) => {
    const { name, email, mobile } = req.body;

    if (!validateEmail(email)) {
        return res.status(400).send('Invalid email address');
    }
    if (!validatePhoneNumber(mobile)) {
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

        res.render("addTask", { users: users })
    } catch (error) {
        res.status(500).send("error : ", error);
    }
}

const tasksPage = async (req, res) => {
    try {
        const users = await user.findAll({
            attributes: ['id', 'name'],
            raw: true
        })
        res.render("tasks", { users });

    } catch (error) {
        res.status(500).send("error : ", error);
    }
}

const gettaskByUserId = async (req, res) => {
    const { userId } = req.body;
    try {
        const userTask = await task.findAll({
            where: {
                userId: userId
            },
            include: [{
                model: user
            }]
        });
        const users = await user.findAll({
            attributes: ['id', 'name'],
            raw: true
        })
        console.log("idea : ", userTask);

        res.render("tasks", { userTask, users })
    } catch (error) {
        res.status(500).send("error : ", error);
    }
}

const exportUserTask = async (req, res) => {
    try {
        const UserTasks = await task.findAll({
            include: [{
                model: user,
            }],
            raw: false
        });

        console.log("chech : ", UserTasks);

        const workbook = new ExcelJS.Workbook();

        const usersWorksheet = workbook.addWorksheet("users");
        usersWorksheet.columns = [
            { header: 'User Id', key: 'id', width: 10 },
            { header: 'User Name', key: 'name', width: 30 },
            { header: 'User Email', key: 'email', width: 30 },
            { header: 'User Mobile No', key: 'mobile', width: 20 },

        ];

        const uniqueUsers = new Map();

        const taskWorksheet = workbook.addWorksheet("taska");
        taskWorksheet.columns = [
            { header: 'Task Id', key: 'id', width: 10 },
            { header: 'User Id', key: 'userId', width: 30 },
            { header: 'User Name', key: 'userName', width: 30 },
            { header: 'User Mobile No.', key: 'userMobile', width: 20 },
            { header: 'Task Name', key: 'taskName', width: 30 },
            { header: 'Task Type', key: 'taskType', width: 30 },
        ];

        UserTasks.forEach(taskItem => {
            const user = taskItem.user;

            taskWorksheet.addRow({
                id: taskItem.id,
                taskName: taskItem.taskName,
                taskType: taskItem.taskType,
                userId: user?.id || '',
                userName: user?.name || '',
                userMobile: user?.mobile || '',
            });

            if (user && !uniqueUsers.has(user.id)) {
                uniqueUsers.set(user.id, {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    mobile: user.mobile
                })
            }
        });

        uniqueUsers.forEach(user => {
            usersWorksheet.addRow(user)
        })
        res.setHeader(
            'Content-Type',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        );
        res.setHeader(
            'Content-Disposition',
            'attachment; filename=users_and_tasks.xlsx'
        );
        await workbook.xlsx.write(res);
        res.end();

    } catch (error) {
        console.log(error);
        res.status(500).send("error generationg Excel file")
    }

}
module.exports =
{
    home,
    createUser,
    saveUser,
    addPage,
    addUserTask,
    tasksPage,
    gettaskByUserId,
    exportUserTask
};