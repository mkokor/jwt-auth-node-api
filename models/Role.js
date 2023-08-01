const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
  name: {
    type: String,
    enum: ["Admin", "Basic User"],
    trim: true,
    required: [true, "Role name field is required."],
  },
});

const Role = mongoose.model("Role", roleSchema);

module.exports = { Role };
