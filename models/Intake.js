const mongoose = require('mongoose');

const intakeSchema = new mongoose.Schema({
  patientName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  appointmentDate: { type: String, required: true },
  chiefComplaint: { type: String, required: true },
  painLevel: { type: Number, required: true, min: 1, max: 10 },
  status: { type: String, default: 'Pending' }, // Pending, Confirmed, Completed
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Intake', intakeSchema);