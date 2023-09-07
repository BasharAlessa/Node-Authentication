const userModel= require("../model/userModel")
const bcrypt = require('bcrypt');

const homePage = (req , res)=>{
    res.render("index")
}
const loginPage= (req , res)=>{
    res.render("login",{
        err:""
    })
    
}
const createUser = (req,res)=>{
    if (req.body.password !== ""){
        var hashedPass = bcrypt.hashSync(req.body.password, 12)
        let userObj = {
            ...req.body,
            password:hashedPass 
        }
        let newUser = new userModel(userObj)
        newUser.save()
            .then(()=>{
                res.render("login", {
                    err:"User has been added, you can login now"
                })
            })
            .catch (err=>{
                console.log("error with adding users" , err);
            })
        console.log(newUser);


    }


}
const loginUser = (req , res)=>{
    userModel.findOne ({email:req.body.email})
        .then(user =>{
            if (user !== null){
                let correctPass= bcrypt.compareSync(req.body.password, user.password)
                    if( correctPass){
                        res.cookie("userLoggedIn", "true")
                        res.cookie("userInfo" , user)
                        res.redirect ("/")
                    } else {
                        res.render("login", {
                            err:"password is not correct... try again!"
                        })
                    }
            } else {
                res.render("login", {
                    err:"User is not regiestered yet , please signup first"
                })
            }
        })
        .catch (err =>{
            console.log(err);
        })
}
const logout= (req,res)=>{
    res.clearCookie("userLoggedIn");
    res.clearCookie("userInfo");
    res.redirect ("/login-user")
}
module.exports ={
    homePage,
    loginPage,
    createUser,
    loginUser,
    logout

    
}