const mongoose =require('mongoose');

// Schema
const dataSchema=mongoose.Schema({
        title:{type:String,trim:true,required:true,unique:true},
        videoTitle:{type:String,trim:true,required:true},
        videoURL:{type:String, required:true},
        videoResource:{type:String, required:true}
    },
    {timestamps:true,versionKey:false}
)

// Model
const moduleLessonModel=mongoose.model('modules',dataSchema);
module.exports=moduleLessonModel;