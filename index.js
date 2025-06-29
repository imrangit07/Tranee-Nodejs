const express = require("express");
const bodyParser = require('body-parser');
const path = require('path')
const Router = require("./routes/adminRoutes")
const hbs = require("hbs");
require("dotenv").config({path:"./.env"});

const app = express();

const sequelize = require('./config/database'); 
const {user,task} = require("./models/index");
// db connection
sequelize.sync({ force: true }).then(async () => {
    console.log("Database Connected Successfully!");
});


app.set("view engine", "hbs");
app.use(express.static(path.join(__dirname + "/public")))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use("/admin", Router);

app.listen(process.env.PORT,(req,res)=>{
    console.log("Server is running on port", process.env.PORT);
})