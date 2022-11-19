const empSchema = require('../models/employeeSchema')
const mappedSchema = require('../models/ratingEmployeeSchema')
const performanceScema = require('../models/ratingScheama')
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
        req.flash('error', 'You have no admin rights'); 
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
    empSchema.findByIdAndUpdate(req.body.id, update, (err, data) => {
        if (err) {
            console.log("Error in updating emp ref:adminControll.editEmp" + err);
            return;
        }
        return res.redirect('back')
    })
}

//module to check which employee has given the rating and what is the rating 
module.exports.viewRating = (req, res) => {
    if (!req.isAuthenticated() || !req.user.is_admin) {//if user if not admin or not signed in then unable to show this page
        return res.redirect('/');
    }
    mappedSchema.find({})
        .populate('employee')
        .populate('rated_emp')
        .populate('rating_id')
        .exec((err, data) => {
            if (err) {
                console.log("Error in fetching mappedSchema ref:adminControll.viewRating" + err);
                return;
            }
            // console.log(data)
            res.render('viewRating', {
                data: data
            })
        })
}

module.exports.editRating = (req, res) => {
    // console.log(req.body);
    //req.body is already in the correct format so we can directly pass it to update the data
    performanceScema.findByIdAndUpdate(req.query.rid, req.body, (err, data) => {
        if (err) {
            console.log("Error in fetching emp ref:adminControll.editRatingform" + err);
            return;
        }
        res.redirect('back')
    });

}


//to add user as admin
module.exports.addasAdmin = (req, res) => {
    req.flash('message', 'Welcome to Blog');
    if (!req.isAuthenticated() || !req.user.is_admin) {//if user if not admin or not signed in then unable to show this page
        return res.redirect('/');
    }
    empSchema.findByIdAndUpdate(req.query.id, { is_admin: true }, (err, data) => {
        if (err) {
            console.log("Error in making admin ref:adminControll.addasAdmin" + err);
            return;
        }
    })
    req.flash('success', 'User added as admin'); 
    res.redirect('back');
}



//to remove user as admin
module.exports.removeasAdmin = (req, res) => {
    if (!req.isAuthenticated() || !req.user.is_admin || req.query.id=="63790f58cf08e635a7436b97"){//if user if not admin or not signed in then unable to show this page
        // ObjectId("63790f58cf08e635a7436b97") is the super admin id
        // so that no one can remove super admin
        if(req.query.id=="63790f58cf08e635a7436b97")
        req.flash('error', 'Cannot remover super admin'); 

        return res.redirect('/');
    }
    empSchema.findByIdAndUpdate(req.query.id, { is_admin: false }, (err, data) => {
        if (err) {
            console.log("Error in making admin ref:adminControll.addasAdmin" + err);
            return;
        }
    })
    req.flash('success', 'User removed as admin'); 
    res.redirect('back');
}