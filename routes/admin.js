const express=require('express');
const router=express.Router();
const adminController=require('../controllers/adminController');


router.use('/map',adminController.map)
router.use('/map',adminController.map)
router.use('/mapEmp',adminController.mapEmp)


module.exports=router

