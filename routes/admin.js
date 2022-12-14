const express=require('express');
const router=express.Router();
const adminController=require('../controllers/adminController');

router.use('/editEmp',adminController.editEmp)
router.use('/map',adminController.map)
router.use('/editRating',adminController.editRating)
router.use('/viewRating',adminController.viewRating)
router.use('/mapEmp',adminController.mapEmp)
router.use('/addasAdmin',adminController.addasAdmin);
router.use('/removeasAdmin',adminController.removeasAdmin);


module.exports=router

