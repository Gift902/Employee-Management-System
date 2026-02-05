const mongoose = require('mongoose');
const newSchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: true, 
      trim: true 
    },
    email: { 
      type: String, 
      required: true, 
      min: 0 
    },
    role: {
        type: String,
        required: true,
        min: 0,
    },
    department: {
        type: String,
        required: true,
        min: 0,
    }
  },
  { collection: 'new', timestamps: true }
);
const NewModel = mongoose.model('New', newSchema);
module.exports = NewModel;
