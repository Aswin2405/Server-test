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
      type: {
        type: String,
        default: 'Feature',
      },
      // latitude: {
      //   type: String,
      //   required: false, // Make latitude optional
      // },
      // longitude: {
      //   type: String,
      //   required: false, // Make longitude optional
      // },
      FIELD5:{
        type: String,
      },
      FIELD6:{
        type: String,
      }
      // geometry: {
      //   type: {
      //     type: String,
      //     default: 'Point',
      //   },
      //   coordinates: {
      //     latitude: {
      //       type: Number,
      //       required: false, // Make latitude optional
      //     },
      //     longitude: {
      //       type: Number,
      //       required: false, // Make longitude optional
      //     },
      //   },
      // },
},{
    timestamps:true,
})

const Guru = mongoose.model("guru",schema)

export default Guru;