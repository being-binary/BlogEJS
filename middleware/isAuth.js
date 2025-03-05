const isAuth = async (req, res, next) => {
    if(req.session.isAuth === true){
        next()
    }
    else{
        res.redirect('/user/login')
    }
}

export default isAuth