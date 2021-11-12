const userModel = require("../models/user.model");

module.exports = function (app) {
    app.use(['/:method/:method2/:method3',
        '/:method/:method2/',
        '/:method',
        '/'
    ],(req,res,next)=>{
        res.locals.METHODPAGE=req.params.method || ''
        res.locals.METHODPAGE2=req.params.method2 || ''
        res.locals.METHODPAGE3=req.params.method3 || ''
        next()
    })
    app.use(function (req, res, next) {
        if (req.session.authUser){
            userModel.getByID(req.session.authUser.ID).then(resp=>{
                if (resp.length > 0){
                    res.locals.lcAuthUser = resp[0] 
                    res.locals.lcIsAuthenticated = true;
                    res.locals.isAdmin = resp[0].permision == 1
                } else 
                    delete req.session.authUser
                next();
            })
            .catch(next)
        }
        else next()
    })
}