const mongoose=require('mongoose');
const PerformanceSchema=mongoose.Schema({
    empid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'employeeSchema',
        required:true
    },
    knowledge:{
        type:Number,
        required:true
    },
    work_quality:{
        type:Number,
        required:true
    },
    attendance:{
        type:Number,
        required:true
    },
    productivity:{
        type:Number,
        required:true
    },
    listening_skills:{
        type:Number,
        required:true
    }
},{timestamps:true});
const Performance=mongoose.model('performance',PerformanceSchema);
module.exports=Performance