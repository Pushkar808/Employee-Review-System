const express=require('express');
const router=express.Router();
const index_controller=require('../controllers/indexController')

router.use('/employee',index_controller.employee)
router.use('/',index_controller.home);

module.exports=router