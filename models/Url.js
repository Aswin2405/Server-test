import mongoose from "mongoose";

const schema = new mongoose.Schema({
    shortId:{
        required:true,
        type: String,
        unique: true
    },
    redirectUrl:{
        required:true,
        type: String,
    },
    visitHistory:[{timestamp:{type:Number}}]
},{
    timestamps:true,
})

const URL = mongoose.model("url",schema)

export default URL;