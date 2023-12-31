const mongoose = require("mongoose");

const refreshTokenSchema = new mongoose.Schema(
  {
    // Database keep encrypted value of refresh token for security reasons.
    valueHash: {
      type: String,
      required: [true, "Refresh token value hash field is required."],
    },
    expirationDate: {
      type: Date,
      required: [true, "Refresh token expiration field is required."],
    },
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
