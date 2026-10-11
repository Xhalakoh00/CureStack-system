const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const Intake = require('./models/Intake');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public')); // Serves our frontend HTML files

// Connect to MongoDB (Local or change to your Atlas URI)
mongoose.connect('mongodb://127.0.0.1:27017/curastack_demo')
  .then(() => console.log('MongoDB Connected to CuraStack Database'))
  .catch(err => console.log('DB Connection Error: ', err));

// --- API ROUTES ---

// POST: Submit a new patient intake form
app.post('/api/intake', async (req, res) => {
  try {
    const newIntake = new Intake(req.body);
    await newIntake.save();
    res.status(201).json({ message: 'Intake submitted successfully', data: newIntake });
  } catch (error) {
    res.status(400).json({ error: 'Failed to submit intake data' });
  }
});

// GET: Fetch all intakes for the Admin Dashboard
app.get('/api/intakes', async (req, res) => {
  try {
    const intakes = await Intake.find().sort({ createdAt: -1 });
    res.status(200).json(intakes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch intakes' });
  }
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`CuraStack Demo running at http://localhost:${PORT}`);
});