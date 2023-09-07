const userAuth = (req, res , next)=>{
    console.log(req.cookies);
    if (req.cookies.userLoggedIn){
        res.locals.userFullName = `${req.cookies.userInfo.firstName} ${req.cookies.userInfo.secondName}`;
        res.locals.userEmail =req.cookies.userInfo.email
        next();
    }else {
        res.redirect ("/login-user")
    }
}
const loginAuth = (req, res , next)=>{
    if (req.cookies.userLoggedIn){
        res.redirect ("/")
    }else {
        next();

    }
}
module.exports= {
    userAuth,
    loginAuth
}