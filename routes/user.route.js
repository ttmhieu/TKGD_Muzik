const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const md5 = require("md5");

const UserModel = require('../models/user.model');
const Helper = require("../utils/helper");
const config = require("../config/default.json");
const mailer = require("../utils/mailer");

router.all('/confirmmail', (req, res) => res.render('vwUser/confirmmail', { fullPage: true }))

router.get('/register',(req,res) => {
    res.render("vwUser/register.hbs",{fullPage:true});
});

router.post('/register/checkinfo', async (req, res) => {
    var Data;
    try {
        Data = JSON.parse(req.body.Data);
    }
    catch (error) {
        return res.send(error.message);
    }

    var Exist = true;
    //Check mail    
    if (await UserModel.checkExistEmail(Data.data.Email))
        return res.status(200).send({ Exist: Exist, err: 0 });

    //Check username
    if (await UserModel.checkExistUsername(Data.data.Username))
        return res.status(200).send({ Exist: Exist, err: 1 });
    Exist = false;
    res.status(200).send(Exist);
});

router.post('/register', async function (req, res) {
    var passwordHash = bcrypt.hashSync(req.body.Password, config.authentication.saltRounds);
    var token = Math.floor(100000 + Math.random() * 900000);
    var getDateTimeNow = Helper.ConverDateTime(new Date());
    var user = {
        userName: req.body.Username,
        Password: passwordHash,
        Email: req.body.Email,
        permision: 0,
        delete: 0,
        status: 0,
        createDate: getDateTimeNow,
        modifileDate: getDateTimeNow,
        DOB: req.body.Birthday,
        activeToken: token
    }
    // Lưu user xuống db
    await UserModel.add(user);
    // Sendmail
    var linkActive = `${config.site.url}/active?token=${user.activeToken}`;
    mailer.sendActiveToken(user.Email, linkActive);
    res.render("vwUser/register.hbs", {fullPage:true, Email: req.body.Email, Success: true});
});

router.get('/active', async function (req, res) {
    const token = +req.query.token || -1;
    const rs = await UserModel.activeAccount(token);
    if (rs.changedRows > 0)
    {
        return res.redirect("/login");
    }
    res.send("Active Failed");
});


router.get('/forget', (req, res) => {
    res.render('vwUser/forget', { fullPage: true })
})

router.post('/forget', (req, res, next) => {
    const { email } = req.body
    let randint, forgetToken
    UserModel.getByEmai(email)
        .then(users => {
            if (users.length == 0) {
                res.render('vwUser/forget', { error: "Emaill address not found!", model: { email }, fullPage: 1 })
                throw true
            }
            const user = users[0]
            randint = Math.floor(Math.random() * 899999) + 100000
            forgetToken = md5(user.ID + '|' + randint)

            UserModel.setForgetToken(forgetToken, user.ID)
            return mailer.sendForgetToken(user.email, `${config.site.url}/forget/${forgetToken}?pass=${randint}`)
        })
        .then(response => {
            console.log('Email response:', response)
            console.log(`/forget/${forgetToken}?pass=${randint}`)
            return res.redirect('/confirmmail')
        })
        .catch((e) => e === true || next(e))
})

const forgetPasswordMiddleware = (req, res, next) => {
    const { token } = req.params
    const { pass } = req.query
    UserModel.getByForgetToken(token).then(response => {
        const user = response[0] || {}
        const hash = md5(user.ID + '|' + pass)
        if (!user || token != hash) {
            return res.redirect('/login')
        }
        req.targetUser = user
        next()
    }).catch(next)
}

router.get('/forget/:token', forgetPasswordMiddleware, (req, res) => {
    res.render('vwUser/resetpassword', { fullPage: true })
})

router.post('/forget/:token', forgetPasswordMiddleware, (req, res, next) => {
    const { p1, p2 } = req.body
    if (p1 != p2) {
        return res.render('vwUser/resetpassword', { error: "Password is invalid or mismatched", fullPage: true })
    }
    var passwordHash = bcrypt.hashSync(req.body.p1, config.authentication.saltRounds);

    const id = req.targetUser.ID
    const updateUser = { refreshToken: null, password: passwordHash, modifileDate: new Date() }
    UserModel.patch(updateUser, id).then(() => res.redirect('/login')).catch(next)
})

router.get('/login', function (req, res) {
    res.render('vwUser/login', { fullPage: true })
})

router.post('/login', async function (req, res) {
    const user = await UserModel.singleByUserNameorEmail(req.body.username);
    if (user === null) {
        return res.render('vwUser/login', {
            fullPage: true,
            err: 'Invalid username or password.'
        })
    }
    const rs = bcrypt.compareSync(req.body.password, user.password);
    if (rs === false) {
        return res.render('vwUser/login', {
            fullPage: true,
            err: 'Invalid username or password.'
        })
    }
    if (user.status === 0) {
        var linkActive = `${config.site.url}/active?token=${user.activeToken}`;
        mailer.sendActiveToken(user.email, linkActive);
    }
    delete user.password;
    req.session.isAuthenticated = true;
    req.session.authUser = user;

    const url = req.query.retUrl || '/';
    res.redirect(url);
})

router.get('/logout', function (req, res) {
    delete req.session.isAuthenticated
    delete req.session.authUser
    res.redirect('/')
})

router.get('/login/setAccount/:userName', function (req, res,next) {
    const {userName} = req.params
    UserModel.getByEmailOrUsername(userName).then(resp=>{
        req.session.isAuthenticated = true;
        req.session.authUser = resp[0];
        res.send('ok')
    }).catch(next)
})

module.exports = router;