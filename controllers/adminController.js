const empSchema = require('../models/employeeSchema')

module.exports.admin = (req, res) => {
    empSchema.find({}, (err, data) => {
        res.render('empView', {
            Empdata: data
        })
    })
}
module.exports.map = async (req, res) => {
    const allEmp = await empSchema.find({ _id: { $ne: req.query.id } })//so that current user i.e user whose rating we are mapping to other will not be viisble
    empSchema.findById(req.query.id, (err, data) => {
        if (err) console.log("errorin render Mapp"+err)
        res.render('mapPerformance', {
            empData: data,
            allEmp: allEmp
        })
    })
}
//module to update the mapped 
module.exports.mapEmp = async (req, res) => {
    let ids = {}
    if (typeof (req.query.mappedId) == "string")//as checkbox send it as object with one data not inside array
        ids = [req.query.mappedId];
    else
        ids = req.query.mappedId
    for(let i=0;i<ids.length;i++){
        empSchema.findByIdAndUpdate(req.query.mappedId,{rating_mapped:req.query.id},(err,data)=>{
            if(err)console.log(err)
        })
    }
    console.log(req.query)
res.redirect('back')

}