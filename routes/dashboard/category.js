const express = require("express");
const router = express.Router();
const categoryModel = require("../../models/category.model");
const config = require("../../config/default.json");
const helper = require("../../utils/helper");

const isAdminMiddleware=(req,res,next)=>{
    if (res.locals.isAdmin)
        return next()
    res.redirect('/')
}

router.get('/',isAdminMiddleware, async (req, res) => {
    const page = +req.query.page || 1;
    const numOfcate = await categoryModel.countCategory();
    const offset = (page - 1) * config.pagination.limitCategory;
    const categoryList = await categoryModel.getListCategoryByPagination(config.pagination.limitCategory, offset);
    const nPages = Math.ceil(numOfcate / config.pagination.limitCategory);
    const Pagination = helper.Pagination(nPages, page);
    res.render('dashboard/category',{
        categoryList,
        Pagination
    });
});

router.post('/delete',isAdminMiddleware, async (req, res) => {
    const rs = await categoryModel.deleteCategory(req.body.categoryId);
    res.redirect('/category');
});



router.get('/getIdName',(req,res,next)=>{
    categoryModel.getIdName().then(res.json.bind(res)).catch(next)
})

router.get('/:id/edit',isAdminMiddleware,(req,res,next)=>{
    categoryModel.getByID(req.params.id).then(resp=>{
        if (resp.length > 0) {
            const currentCategory = resp[0]
            res.render('vwCategory/add', {currentCategory, isEdit: true});
        }
        else 
            throw null
    })
    .catch(next)
})

router.post('/edit',isAdminMiddleware,async (req,res)=>{
    var entity={
        ID: req.body.categoryId,
        Name: req.body.name,
        description: req.body.description,
        modifileDate: new Date()
    }
    await categoryModel.edit(entity);
    res.redirect('/category?status=edited');
})

router.get('/add',isAdminMiddleware, (req,res)=>{
    res.render('vwCategory/add');
});
router.post('/add',isAdminMiddleware,async (req,res)=>{
    const today = new Date()
    var entity={
        Name: req.body.name,
        description: req.body.description,
        delete: 0,
        createDate: today,
        modifileDate: today
    }
    await categoryModel.add(entity);
    res.redirect('/category?status=added');
})
module.exports = router;