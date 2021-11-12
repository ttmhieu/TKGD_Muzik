const express = require("express");
const router = express.Router();
const config = require('../../config/default.json')
const songModel = require('../../models/song.model');
const helper = require("../../utils/helper");
const limitSong = config.pagination.limitSong


router.get("/search/:searchString",async (req,res,next)=>{
    const {searchString} = req.params
    const page = +req.query.page || 1;
    const offset = (page - 1) * limitSong;

    Promise.all([
        songModel.search(searchString,true),
        songModel.search(searchString,false,limitSong,offset)
    ]).then(([[{numOfSong}],songList])=>{
        const nPages = Math.ceil(numOfSong / limitSong);
        const Pagination = helper.Pagination(nPages, page);
        res.render("vwSong/list.hbs", {
            searchString,
            songList,
            numOfSong,
            Pagination
        });
    })
    .catch(next)
});

router.get('/search', function (req, res, next) {
    if (req.query.keyword)
        return res.redirect(`/search/${req.query.keyword}`)
    next()
})
module.exports=router;