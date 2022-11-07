//table which hold data about the emp who had given the rating
const mongoose=require('mongoose');
const RatingEmpSchema=mongoose.Schema({
    emp_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'employeeSchema',
        required:true
    },
    rating_emp:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'employeeSchema',
        required:true
    },
    rating_given:{
        type:Boolean,
        required:true
    }
},{timestamps:true});

const RatingEmp=mongoose.model('RatingEmpSchema',RatingEmpSchema);
module.exports=RatingEmp