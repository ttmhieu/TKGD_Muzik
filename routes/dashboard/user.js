const express = require("express");
const router = express.Router();
const userModel = require("../../models/user.model");
const bcrypt = require("bcrypt");
const config = require("../../config/default.json");
const helper = require("../../utils/helper");

const isAdminMiddleware=(req,res,next)=>{
    if (res.locals.isAdmin)
        return next()
    res.redirect('/')
}

router.get('/',isAdminMiddleware, async (req, res) => {
    const page = +req.query.page || 1;
    const numOfUser = await userModel.countUser();
    const offset = (page - 1) * config.pagination.limitUser;
    const userList = await userModel.getListUserByPagination(config.pagination.limitUser, offset);
    const nPages = Math.ceil(numOfUser / config.pagination.limitUser);
    const Pagination = helper.Pagination(nPages, page);
    res.render('dashboard/user/list', {userList, Pagination})
});

router.get('/add',isAdminMiddleware, (req, res) => {
    res.render('dashboard/user/add');
});

router.get('/:id/edit',isAdminMiddleware, async (req,res,next)=>{
    const currentUser = await userModel.getByID(req.params.id);
    if (currentUser.length === 0)
        return next();
    res.render('dashboard/user/add', {currentUser: currentUser[0], isEdit: true});
});

router.post('/updatePermission',isAdminMiddleware, async (req, res) => {
    var info = "";
    try{
      info = JSON.parse(req.body.info);
    }
    catch (error)
    {
      console.error(error.message);
    }
    const rs = await userModel.updatePermission(info.dataToSend);
    res.status(200).send(true);
});

router.post('/activeAccount',isAdminMiddleware, async (req, res) => {
    const entity = {
        ID: req.body.ID,
        status: 1
    };
    const rs = await userModel.activeAccountByAdmin(entity);
    res.status(200).send(true);
});

router.post('/add',isAdminMiddleware, async (req, res) => {
    const entity = {
        userName: req.body.userName,
        password: bcrypt.hashSync(req.body.passWord, config.authentication.saltRounds),
        Email: req.body.Email,
        gender: req.body.gender,
        DOB: new Date(req.body.DOB),
        permision: 0,
        delete: 0,
        createDate: new Date(),
        modifileDate: new Date(),
        status: 1,
    }
    await userModel.add(entity);
    res.redirect('/user');
});

router.post('/edit',isAdminMiddleware, async (req, res) => {
    const entity = {
        ID: req.body.userId,
        Email: req.body.Email,
        gender: req.body.gender,
        DOB: new Date(req.body.DOB),
        modifileDate: new Date(),
    }
    await userModel.patch(entity, entity.ID);
    res.redirect('/user');
});

router.post('/checkemail', async (req, res) => {
    var Data;
    try {
        Data = JSON.parse(req.body.Data);
    }
    catch (error) {
        return res.send(error.message);
    }

    var Exist = true;
    //Check mail    
    if (await userModel.checkExistEmailWithID(Data.data.Email, Data.data.ID))
        return res.status(200).send(true);
    return res.status(200).send(false);
});

router.post('/delete',isAdminMiddleware, async (req, res) => {
    const entity = {
        ID: req.body.userId,
        delete: 1
    }
    await userModel.delete(entity);
    res.redirect('/user');
});

module.exports = router;