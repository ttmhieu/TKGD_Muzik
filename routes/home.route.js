const categoryModel = require('../models/category.model');
const config = require('../config/default.json')

module.exports = (req,res,next)=>{
    Promise.all([
        categoryModel.getHotSong(config.stack.hot),
        categoryModel.getNewest(config.stack.newest),
        categoryModel.getPopular(config.stack.popular),
        categoryModel.getTopTrend(config.stack.toptrend),
        categoryModel.getTrend(config.stack.trending)
    ]).then(([hotSongData,newestData,popularData,topTrendData,trendData])=>{
        res.render('home',{hotSongData,newestData,popularData,topTrendData,trendData})
    })
    .catch(next)
}