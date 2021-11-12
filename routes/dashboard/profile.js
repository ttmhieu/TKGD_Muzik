const express = require("express");
const bcrypt = require('bcrypt')
const config = require('../../config/default.json')
const userModel = require("../../models/user.model");
const { uploadFn,moveFn } = require("../../utils/upload");
const router = express.Router();

const changePassword = async (req,res) => {
    const {cpass,npass,vpass} = req.body
    if (!npass || !vpass || npass != vpass){
        return {errorMsg: "New password is invalid or mismatched"}
    }
    const rs = bcrypt.compareSync(cpass, res.locals.lcAuthUser.password);
    if (rs === false) {
        return {errorMsg: "Current password is invalid"}
    }
    var passwordHash = bcrypt.hashSync(npass, config.authentication.saltRounds);

    return userModel.patch({password:passwordHash},res.locals.lcAuthUser.ID)
    .then(()=>({succMsg:'Password changed successfully'}))
}
const changeInformation = async (req,res) => {
    return uploadFn(req).then(({fields,files})=>{
        let {email,dob,gender} = fields
        const entity={
            email,
            DOB: new Date(dob),
            gender:+gender,
            modifileDate: new Date()
        }

        const currentUser = res.locals.lcAuthUser

        if (files && files.avatar && files.avatar.size > 0){
            return moveFn(files.avatar.path,'./public/images/user/upload-'+currentUser.ID+'.png')
            .then(()=>{
                entity.avatar=1
            })
            .finally(async()=>{
                return userModel.patch(entity,res.locals.lcAuthUser.ID)
                .then(()=>{
                    res.locals.lcAuthUser = {...currentUser,...entity}
                    return {succMsg:'Information changed successfully'}
                })
            })
        }
        else 
        {
            return userModel.patch(entity,res.locals.lcAuthUser.ID)
            .then(()=>{
                res.locals.lcAuthUser = {...currentUser,...entity}
                return {succMsg:'Information changed successfully'}
            })
        }
    })
}

router.get('/', (req, res) => {
  res.render('dashboard/profile')
});

router.post('/', (req,res,next)=>{
    const data={method:req.query.method}
    let fnProcess = ()=>{}
    switch (req.query.method){
        case 'password':
            fnProcess=changePassword
            break
        case 'information':
            fnProcess=changeInformation
            break
        default:
            res.redirect('back')
            return
    }
    fnProcess(req,res).then(resp=>{
        res.render('dashboard/profile',{...data,...resp})
    }).catch(next)
})
module.exports = router;
