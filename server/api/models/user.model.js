const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    auto: true,
  },
  name: {
    type: String,
    required: true,
    min: 4,
  },
  email: {
    type: String,
    unique: [true, "Email is exist!"],
    validate: {
      validator: function (v) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
      },
      message: "Please enter a valid email",
    },
    required: [true, "Email is invaild."],
  },
  password: {
    type: String,
    required: true,
    min: 6,
  },
});

module.exports = model("User", userSchema);
