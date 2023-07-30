const mongoose = require("mongoose");

const refreshTokenSchema = new mongoose.Schema(
  {
    value: {
      type: String,
      required: [true, "Refresh token value field is required."],
    },
    // expirationDate: {
    //   type: String,
    //   required: [true, "Refresh token expiration field is required."],
    // },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Refresh token owner field is required."],
    },
  },
  {
    collection: "refreshTokens",
  }
);

const RefreshToken = mongoose.model("RefreshToken", refreshTokenSchema);

module.exports = { RefreshToken };
