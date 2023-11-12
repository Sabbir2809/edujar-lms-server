const mongoose =require('mongoose');

// Schema
const dataSchema=mongoose.Schema({
        userID:{type:mongoose.Schema.Types.ObjectId,required:true},
        courseID:{type:mongoose.Schema.Types.ObjectId,required:true},
    },
    {timestamps:true,versionKey:false}
)

// Model
const enrollmentModel=mongoose.model('enrolls',dataSchema);
module.exports=enrollmentModel;