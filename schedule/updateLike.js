const schedule = require('node-schedule');
const config = require('../config/default.json')
const songModel = require('../models/song.model')

let isUpdateLike = true

schedule.scheduleJob(config.schedule.like, function(){
    if (isUpdateLike){
        songModel.updateLike().then(()=>{
            console.log('Updated like');
            isUpdateLike=false
        }).catch(console.log)
    }
});

exports.setUpdateLike = () => isUpdateLike=true