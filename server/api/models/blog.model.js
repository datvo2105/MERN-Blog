const { Schema, model } = require("mongoose");

module.exports = model(
  "Blog",
  new Schema(
    {
      _id: {
        type: Schema.Types.ObjectId,
        auto: true,
      },
      title: {
        type: String,
      },
      summary: {
        type: String,
      },
      cover: {
        type: String,
      },
      content: {
        type: String,
      },
      author: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    },
    {
      timestamps: true,
    }
  )
);
