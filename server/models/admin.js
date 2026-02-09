const mongoose = require('mongoose');
const AdminSchema = new mongoose.Schema(
  {
    email: { 
      type: String, 
      required: true, 
      min: 0 
    },
    password: {
        type: String,
        required: true
    }
  },
  { timestamps: true }
);
const AdminModel = mongoose.model('Admin', AdminSchema);
module.exports = AdminModel;
