const mongoose =require('mongoose');

// Schema
const dataSchema=mongoose.Schema({
        title:{type:String,required:true},
        description:{type:String,required:true},
        price:{type:String},
        image:{type:String,required:true},
        courseID:{type:mongoose.Schema.Types.ObjectId,required:true},
    },
    {timestamps:true,versionKey:false}
)

// Model
const courseSliderModel=mongoose.model('courseSliders',dataSchema);
module.exports=courseSliderModel;