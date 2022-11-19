const employeeSchema = require('../models/employeeSchema');
const ratingSchema = require('../models/ratingScheama');
const ratingMapSchema = require('../models/ratingEmployeeSchema');
const e = require('express');
//module to view employee
module.exports.employee = (req, res) => {
    employeeSchema.find({}, (err, Empdata) => {
        if (err) { console.log("ERROR in View of Emp" + err); return; }
        res.render('employee', {
            Empdata: Empdata
        })
    })

}
//module to add employee
module.exports.add_employee = (req, res) => {
    employeeSchema.create({
        name: req.body.name,
        email: req.body.empmail,
        empid: req.body.empid,
        department: req.body.jobtitle,
        jobtitle: req.body.department,
        password:req.body.password,
        manager_email: req.body.manager_mail,
        is_admin:false//initially employee is not admin
    })
    res.redirect('back')
}
//module to delete employee
module.exports.delete = (req, res) => {
    employeeSchema.deleteOne({ id: req.query.id }, (err, data) => { if (err) console.log(err) });
    req.flash('success', 'Employee deleted!'); 
    res.redirect('back')
}

//module to add performance for employee
module.exports.addPerformance = (req, res) => {
    employeeSchema.find({}, (err, Empdata) => {
        if (err) { console.log("ERROR in View of Emp" + err); return; }
        res.render('addPerformance', {
            Empdata: Empdata
        })
    })
}
//module to add performance for employee
module.exports.addReviewForm =async (req, res) => {
    const rating_details=await ratingMapSchema.find({rated_emp:req.query.id,employee:req.user.id}).populate('rating_id')
    const empData=await employeeSchema.findById(req.query.id)
    if(rating_details.length!=0){
        return res.render('addReviewForm', {
            empData: empData,
            ratingDetails:rating_details,//as if user has given review already then only send this
            ratingDone:true
        });
    }
    else{
        return res.render('addReviewForm', {
            empData: empData,
            ratingDone:false
        });
    }
    
     
}

//form to submit rating 
module.exports.rating =async (req, res) => {
    const newRating = await ratingSchema.create({
        empid: req.query.id,
        knowledge: req.body.range[0],
        work_quality: req.body.range[1],
        attendance: req.body.range[2],
        productivity: req.body.range[3],
        listening_skills: req.body.range[4],
    });
    //DB to know which emp has give rating to which emp and what is the rating
    await ratingMapSchema.create({
        employee:req.user.id,
        rated_emp:req.query.id,
        rating_id:newRating.id,
        rating_given:true
    })
    req.flash('success', 'Thanks for your feedback'); 
    res.redirect('back');
}

//to view the rating mapped by admin to the employee
module.exports.viewRating=async (req,res)=>{
    if (!req.isAuthenticated()) {//if user is not already signed in the don't show login form
        res.redirect('/')
    }
    await req.user.populate('rating_mapped')
    res.render('viewPerformance',{
        rating_mapped:req.user.rating_mapped
    })
}