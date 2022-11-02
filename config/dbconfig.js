const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/EmpReviewSystem')
const DB=mongoose.connection;
DB.on('error',err=>logError(err));
DB.on('open',()=>console.log("Connected to MongoDB successfuly"));
