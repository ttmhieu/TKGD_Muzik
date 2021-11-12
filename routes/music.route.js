const express = require("express");
const { now } = require("moment");
const categoryModel = require("../models/category.model");
const songModel = require("../models/song.model");
const router = express.Router();
const SongModel = require("../models/song.model");
const { setUpdateComment } = require("../schedule/updateComments");

router.get('/getCategoryIdName',(req,res,next)=>{
  categoryModel.getIdName().then(res.json.bind(res)).catch(next)
})

router.get('/:id', (req, res,next) => {
    const id = +req.params.id || 1;
    let musicData={}

    songModel.getById(id).then(resp => {
      if (resp.length == 0 || resp[0].status != 1)
        throw null

      musicData=resp[0]
      songModel.patch(id,{views:musicData.views+1})
      return Promise.all([
        songModel.getCommentListById(id),
        songModel.getRandomByCategory(musicData.category,6)
      ])
    })
    .then(([listComment,songList])=>{
        songList = songList.filter(x=>x.ID != musicData.ID)
        res.render("../views/vwMusic/detailMusic.hbs", {
            playable: true, 
            idMusic: id, 
            listComment,
            songList,
            musicData
        });
    })
    .catch(next)    
});

router.post('/addcomment', async (req, res) => {
    var info = "";
    try{
      info = JSON.parse(req.body.info);
    }
    catch (error)
    {
      console.error(error.message);
    }
    const entity = {
      User: res.locals.lcAuthUser.ID,
      Song: info.dataToSend.idMusic,
      content: info.dataToSend.comment,
      delete: 0,
      createDate: new Date(),
      modifileDate: new Date()
    }
    const rs = await SongModel.addComment(entity);
    const getCommentDate = await SongModel.getNewCommentOfUserById(entity.User, entity.Song);
    const result = {
      status: true,
      cmDate: getCommentDate.cmDate
    };
    if (rs.affectedRows > 0)
    {
        setUpdateComment()
        return res.status(200).send(result);
    }
    result.status = false;
    res.status(200).send(result); 
});

module.exports = router;