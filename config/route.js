const express = require("express")
const route = express.Router()
const userController= require("../controller/userController")
const auth = require("../midleware/auth")

route.get("/" , auth.userAuth ,userController.homePage)
route.get("/login-user" , auth.loginAuth, userController.loginPage)
route.post("/singup-user", userController.createUser)
route.post("/login-user" , userController.loginUser)
route.get("/logout-user" , userController.logout)


module.exports = route