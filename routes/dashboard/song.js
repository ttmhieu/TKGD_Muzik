const express = require("express");
const config = require('../../config/default.json');
const songModel = require("../../models/song.model");
const { setUpdateLike } = require("../../schedule/updateLike");
const { uploadFn,moveFn } = require("../../utils/upload");
const router = express.Router();

const uploadMusic = async (req,res) => {
    return uploadFn(req).then(({fields,files})=>{
        let {name,singer,composer,category} = fields
        if (! +category>0){
            return {errMsg: "Category is not valid"}
        }

        const entity={
            Name:name,
            Singer:singer,
            composer:composer,
            author:res.locals.lcAuthUser.ID,
            category:category,
            views:0,
            likes:0,
            createDate:new Date(),
        }
        if (files && files.thumb && files.thumb.size > 0 
            && files.music && files.music.size > 0){
            
            return songModel.add(entity).then(resp=>{
                const insertId = resp.insertId
                moveFn(files.thumb.path,'./public/images/song/upload-'+insertId+'.png')
                moveFn(files.music.path,'./public/song/upload-'+insertId+'.mp3')
                return {succMsg: "Upload successfully."}
            })    
        }
        return {errMsg: "Upload something went wrong."}
    })
}

const updateMusic = async (req,res) => {
    return uploadFn(req).then(({fields,files})=>{
        let {id} = req.params
        let {name,singer,composer,category} = fields
        if (! +category>0){
            return {errMsg: "Category is not valid"}
        }

        const entity={
            Name:name,
            Singer:singer,
            composer:composer,
            category:category,
        }
        res.locals.songData = {...res.locals.songData,...entity}

        if (files && files.thumb && files.thumb.size > 0){
            moveFn(files.thumb.path,'./public/images/song/upload-'+id+'.png')
        }

        return songModel.patch(id,entity).then(resp=>{
            return {succMsg: "Upload successfully."}
        })
    })
}

const isAdminMiddleware=(req,res,next)=>{
    if (res.locals.isAdmin)
        return next()
    res.redirect('/')
}

router.get('/upload', (req, res) => {
    res.render('dashboard/song/upload')
});

router.post('/upload', (req,res,next)=>{
    uploadMusic(req,res).then(resp=>{
        res.render('dashboard/song/upload',resp)
    }).catch(next)
})

//user
router.get('/list/me',(req,res,next)=>{
    songModel.getListSong(res.locals.lcAuthUser.ID)
    .then( songList =>{
        res.render('dashboard/song/list',{
            songList,
        })
    }).catch(next)
})

//admin
router.get('/list',isAdminMiddleware,(req,res,next)=>{
    songModel.getListSong()
    .then( songList =>{
        res.render('dashboard/song/list',{
            songList,
        })
    }).catch(next)
})

router.post('/:id/publish',isAdminMiddleware,(req,res,next)=>{
    if (+req.params.id > 0){
        songModel.patch(req.params.id,{
            status:1,
            publishDate: new Date()
        }).catch(console.log)
    }
    return res.redirect('back')
})
router.post('/:id/draft',isAdminMiddleware,(req,res,next)=>{
    if (+req.params.id > 0){
        songModel.patch(req.params.id,{
            status:0,
            publishDate: null
        }).catch(console.log)
    }
    return res.redirect('back')
})

//

router.all('/:id/edit',(req,res,next)=>{
    if (+req.params.id > 0){

        return songModel.getById(req.params.id,res.locals.isAdmin?null:res.locals.lcAuthUser.ID)
        .then(resp=>{
            if (resp.length==0)
                return next('router')
            res.locals.songData = resp[0]
            return next()
        })
        .catch(next)
    }
    next('router')
})

router.get('/:id/edit',(req,res)=>{
    res.render('dashboard/song/edit')
})

router.post('/:id/edit', (req,res,next)=>{
    updateMusic(req,res).then(resp=>{
        res.render('dashboard/song/edit',resp)
    }).catch(next)
})

router.post('/:id/delete',(req,res)=>{
    if (+req.params.id > 0){
        songModel.delete(req.params.id,res.locals.isAdmin?null:res.locals.lcAuthUser.ID)
        .catch(console.log)
    }
    res.redirect('back')
})

router.get('/like',(req,res,next)=>{
    songModel.likedList(res.locals.lcAuthUser.ID).then(resp=>{
        const result = resp.map(x=>x.ID)
        res.json(result)
    }).catch(next)
})
router.post('/like',(req,res)=>{
    const {id,state} = req.body
    if (+id > 0){
        let fn = songModel.unLike
        if (+state>0)
            fn = songModel.like
        fn(id,res.locals.lcAuthUser.ID)
        .catch(()=>{})
        .finally(()=>{
            setUpdateLike()
            res.sendStatus(200)
        })
    }
    else 
        res.sendStatus(200)
})

module.exports = router;
