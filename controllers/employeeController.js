const employeeSchema = require('../models/employeeSchema');

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
        manager_email: req.body.manager_mail
    })
    res.redirect('back')
}
//module to delete employee

module.exports.delete = (req, res) => {
    employeeSchema.deleteOne({ id: req.query.id }, (err, data) => { if (err) console.log(err) });
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
module.exports.addReviewForm = (req, res) => {
    // console.log(req.query);
    employeeSchema.findById(req.query.id, (err, data) => {
        if (err) { console.log("ERROR in View of Emp" + err); return; }
        res.render('addReviewForm',{
            empData:data
       });
    })
}