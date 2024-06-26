const mongoose = require("mongoose");

const PinSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
    },
    title: {
        type: String,
        require: true,
        min: 3,
      },
    desc: {
        type: String,
        require: true,
      },
    rating: {
        type: Number,
        require: true,
        min: 0,
        max: 5,
      },
    lat:{
        type: Number,
        require: true,
      },
    long: {
        type: Number,
        required: true,
      },
    imgURL: {
        type: String,
        require: true,
    }
  },
  { timestamps: true }
);
module.exports = mongoose.model("Pin", PinSchema);