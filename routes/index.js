const express = require('express');
const router = express.Router();
const index_controller = require('../controllers/indexController')
const passport=require('passport')

router.use('/createSession', passport.authenticate('local', {
    failureRedirect: '/login'
}), index_controller.createSession);

router.use('/employee', require('./employee'))
router.use('/login', index_controller.login)
router.use('/logout',index_controller.destroySession)
router.use('/admin',require('./admin'));
router.use('/', index_controller.home);

module.exports = router