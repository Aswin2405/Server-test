import mongoose from "mongoose";

const schema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    }
},{
    timestamps:true
})

const userModal = mongoose.model("user",schema)

export default userModal