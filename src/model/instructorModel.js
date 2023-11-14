const mongoose = require("mongoose");

// Schema
const dataSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    description: { type: String },
    image: [
<<<<<<< HEAD
        {
            publicID: {
                type: String,
                required: true,
            },
            url: {
                type: String,
                required: true,
            },
        },
=======
      {
        publicID: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
>>>>>>> 000b315f605caed285aa784f269d5782aeb79314
    ],
    phoneNumber: { type: String, required: true },
  },
  { timestamps: true, versionKey: false }
);

// Model
const instructorModel = mongoose.model("instructors", dataSchema);
module.exports = instructorModel;
