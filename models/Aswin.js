import mongoose from "mongoose";

const schema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
      },
      last_name: {
        type: String,
        required: true,
      },
          latitude: {
            type: String,
            required: false, // Make latitude optional
          },
          longitude: {
            type: String,
            required: false, // Make longitude optional
          }
},{
    timestamps:true,
})

const Aswin = mongoose.model("aswin",schema)

export default Aswin;