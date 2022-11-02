const employeeSchema = require('../models/employeeSchema');


module.exports.employee = (req, res) => {
    employeeSchema.find({}, (err, Empdata) => {
        if (err) { console.log("ERROR in View of Emp" + err); return; }
        res.render('employee', {
            Empdata: Empdata
        })
    })

}

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

module.exports.delete = (req, res) => {
    console.log("OK")
    employeeSchema.deleteOne({ id: req.query.id },(err,data)=>{if(err)console.log(err)});
    res.redirect('back')
}