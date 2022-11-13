const empSchema = require('../models/employeeSchema')
//
module.exports.admin = (req, res) => {
    empSchema.find({}, (err, data) => {
        res.render('empView', {
            Empdata: data
        })
    })
}

//module to render form map the employees 
module.exports.map = async (req, res) => {
    if (!req.isAuthenticated() || !req.user.is_admin) {//if user if not admin or not signed in then unable to show this page
        return res.redirect('/');
    }
    const allEmp = await empSchema.find({ _id: { $ne: req.query.id } })//so that current user i.e user whose rating we are mapping to other will not be viisble
    res.locals.mappedId = req.query.id;
    empSchema.findById(req.query.id, async (err, data) => {
        if (err) console.log("errorin render Mapp" + err)
        await res.render('mapPerformance', {
            empData: data,
            allEmp: allEmp
        })
    }).clone()

}
//module to update the mapped 
module.exports.mapEmp = (req, res) => {
    let ids = {}
    if (typeof (req.query.mappedId) == "string")//as checkbox send it as object with one data not inside array
        ids = [req.query.mappedId];
    else
        ids = req.query.mappedId
    for (let i = 0; i < ids.length; i++) {
        // console.log(ids[i])
        // $addToSet is so that it contain only unique mappedId not repeated
        empSchema.findByIdAndUpdate(ids[i], { $addToSet: { rating_mapped: req.query.id } }, (err, data) => {
            if (err) console.log(err)
        })
    }
    res.redirect('back')
}

module.exports.editEmp = (req, res) => {
    if (!req.isAuthenticated() || !req.user.is_admin) {//if user if not admin or not signed in then unable to show this page
        return res.redirect('/');
    }
    const update = {
        name: req.body.name,
        jobtitle: req.body.jobtitle,
        department: req.body.department,
        empid: req.body.empid
    }
    empSchema.findByIdAndUpdate(req.body.id,update,(err,data)=>{
        if(err){
            console.log("Error in updating emp ref:adminControll.editEmp"+err);
            return;
        }
        return res.redirect('back')
    })
}