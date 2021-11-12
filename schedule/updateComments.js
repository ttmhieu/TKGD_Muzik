const schedule = require('node-schedule');
const config = require('../config/default.json')
const songModel = require('../models/song.model')

let isUpdateComment = true

schedule.scheduleJob(config.schedule.comment, function(){
    if (isUpdateComment){
        songModel.updateComment().then(()=>{
            console.log('Updated comments');
            isUpdateComment=false
        }).catch(console.log)
    }
});

exports.setUpdateComment = () => isUpdateComment=true