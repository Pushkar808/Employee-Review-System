//table which hold data about the emp who had given the rating
const mongoose=require('mongoose');
const RatingEmpSchema=mongoose.Schema({
    employee:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Employee',
        required:true
    },
    rated_emp:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Employee',
        required:true
    },
    rating_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'performance',
        required:true
    },
    rating_given:{
        type:Boolean,
        required:true
    }
    
},{timestamps:true});

const RatingEmp=mongoose.model('RatingEmpSchema',RatingEmpSchema);
module.exports=RatingEmp