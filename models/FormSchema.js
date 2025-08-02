const mongoose = require('mongoose');

const FieldSchema = new mongoose.Schema({
  type: { type: String, required: true },
  label: { type: String, required: true },
  required: { type: Boolean, default: false },
  options: [String],
});

const FormSchema = new mongoose.Schema({
  name: { type: String, required: true },
  fields: [FieldSchema],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('FormSchema', FormSchema);
