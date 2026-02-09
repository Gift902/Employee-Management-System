const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db.js');
const cors = require('cors');
const app = express();
const NewModel = require('./models/Employee.js');
const AdminModel = require('./models/admin.js')
const authRoutes = require('./routes/auth.js');
dotenv.config();
app.use(cors());
app.use(express.json());
connectDB();
app.use("/api/EmployeesDB/admin", authRoutes);
app.post('/api/EmployeesDB/admin', async (req, res, next) => {
  try {
    const { email, password} = req.body;
    if (!email === undefined || password === '') {
      return res.status(400).json({ message: 'email and password are required' });
    }
    const doc = await AdminModel.create({
      email,
      password
    });
    res.status(201).json(doc);
  } catch (err) {
    next(err);
  }
});
app.get('/api/EmployeesDB/new', async (req, res, next) => {
  try {
    const docs = await NewModel.find().lean();
    res.status(200).json(docs);
  } catch (err) {
    next(err);
  }
});
app.post('/api/EmployeesDB/new', async (req, res, next) => {
  try {
    const { name, email, role, department } = req.body;
    if (!name || email === undefined || role === '' || !department) {
      return res.status(400).json({ message: 'name, email, role and department are required' });
    }
    const doc = await NewModel.create({
      name,
      email,
      role,
      department
    });
    res.status(201).json(doc);
  } catch (err) {
    next(err);
  }
});
app.get('/api/EmployeesDB/new/:id', async (req, res, next) => {
  try {
    const user = await NewModel.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    next(err);
  }
});
app.put('/api/EmployeesDB/new/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email, role, department } = req.body;
    if (!name || email === undefined || role === '' || !department) {
      return res.status(400).json({ message: 'name, email, role and deaprtment are required' });
    }
    const updatedDoc = await NewModel.findByIdAndUpdate(
      id,
      {
        name,
        email,
        role,
        department
      },
      { new: true }
    );
    if (!updatedDoc) {
      return res.status(404).json({ message: 'Document not found' });
    }
    res.status(200).json({
      message: 'Document updated successfully',
      data: updatedDoc,
    });
  } catch (err) {
    next(err);
  }
});
app.delete('/api/EmployeesDB/new/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedDoc = await NewModel.findByIdAndDelete(id);
    if (!deletedDoc) {
      return res.status(404).json({ message: 'Item not found' });
    }
    return res.status(200).json({ message: 'Item deleted successfully' });
  } catch (err) {
    console.error('Delete error:', err);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
});
const PORT = process.env.PORT || 5001
app.listen(PORT, () => {
    console.log(`Backend is running on http://localhost:${PORT}`);
});
