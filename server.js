const express = require ("express");
const app = express();
const routes= require("./config/route");
require("./config/mongoose")

var cookieParser = require("cookie-parser");
app.use(cookieParser())

app.set("view engine" , "ejs")
app.use(express.json())

app.use(express.urlencoded({extended:true}))

app.use(routes)
const port = 3000
app.listen(`${port}` , ()=> console.log(`server port ${port} is --- ON`))