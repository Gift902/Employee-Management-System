const mongoose = require('mongoose');
const AdminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
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
