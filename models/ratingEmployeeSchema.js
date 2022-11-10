//table which hold data about the emp who had given the rating
const mongoose=require('mongoose');
const RatingEmpSchema=mongoose.Schema({
    employee:{//employee who had given the rating
        type:mongoose.Schema.Types.ObjectId,
        ref:'Employee',
        required:true
    },
    rated_emp:{//employee whose rating is given
        type:mongoose.Schema.Types.ObjectId,
        ref:'Employee',
        required:true
    },
    rating_id:{//rating id 
        type:mongoose.Schema.Types.ObjectId,
        ref:'performance',
        required:true
    },
    rating_given:{//it used for user so that user can give rating one time only
        type:Boolean,
        required:true
    }
    
},{timestamps:true});

const RatingEmp=mongoose.model('RatingEmpSchema',RatingEmpSchema);
module.exports=RatingEmp