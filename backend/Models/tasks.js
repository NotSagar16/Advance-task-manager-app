const mongoose = require('mongoose')

const tasks=async (req,res)=>{
    try {
        await mongoose.connect('mongodb://localhost:27017/tasks')
        .then(()=>{
            console.log("Connected")
        })
    } catch (error) {
        console.log(error)
    }
};
tasks();
const taskSchema = mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    
});

module.exports = mongoose.model("tasks",taskSchema);