const express = require("express");
const router = express.Router();

const authenMiddleware =(req,res,next)=>{
  if (res.locals.lcIsAuthenticated){
    return next()
  }
  res.redirect('/login')
}

router.use('/profile',authenMiddleware,require('./profile'))
router.use('/category',authenMiddleware,require('./category'))
router.use('/song',authenMiddleware,require('./song'))
router.use('/user',authenMiddleware,require('./user'));
router.use('/favorite',authenMiddleware,require('./favorite'));

module.exports = router;
