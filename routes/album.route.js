const express = require("express");
const router = express.Router();
const config = require('./../config/default.json')
const songModel = require('./../models/song.model');
const categoryModel = require('../models/category.model');
const helper = require("./../utils/helper");
const limitSong = config.stack.limitAlbum

function buildAlbum(input){
    const data = [],tmp={}
    input.forEach(x=>{
        if (tmp[x.categoryName]){
            tmp[x.categoryName].list.push(x)
        } else {
            tmp[x.categoryName] = {
                categoryId:x.category,
                categoryName:x.categoryName,
                description: x.description,
                list: [x]
            }
        }
    })
    Object.entries(tmp).forEach(x=>{
        data.push(x[1])
    })
    return data
}

router.get("/",async (req,res,next)=>{
    categoryModel.getAlbum(limitSong)
    .then(([_,resp])=>{
        const albumData = buildAlbum(resp)
        res.render('album',{albumData})
    })
    .catch(next)    
});

router.get("/:id",async (req,res,next)=>{
    const {id} = req.params
    if (+id > 0){
        const page = +req.query.page || 1;
        const offset = (page - 1) * limitSong;

        return categoryModel.getByID(id)
        .then(resp=>{
            if (resp.length > 0){
                const categoryData = resp[0]

                return Promise.all([
                    songModel.getByCategory(id,true),
                    songModel.getByCategory(id,false,limitSong,offset)
                ]).then(([[{numOfSong}],songList])=>{
                    const nPages = Math.ceil(numOfSong / limitSong);
                    const Pagination = helper.Pagination(nPages, page);
                    res.render("vwSong/list.hbs", {
                        categoryData,
                        songList,
                        numOfSong,
                        Pagination,
                        isAlbum:true
                    });
                })
            }
            else
                throw null
        })
        .catch(next)
    }
    next()
});

module.exports=router;