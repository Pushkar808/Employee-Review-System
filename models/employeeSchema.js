const mongoose=require('mongoose');
const EmpSchema=mongoose.Schema({//Db structure
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    empid:{
        type:Number,
        required:true
    },
    department:{
        type:String,
        required:true
    },
    jobtitle:{
        type:String,
        required:true
    },
    manager_email:{
        type:String,
        required:true
    },
    // is_admin:{
    //     type:Boolean
    // }
})
const Employee=mongoose.model('Employee',EmpSchema);
module.exports=Employee