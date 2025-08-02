const mongoose = require('mongoose');

const FamilyMemberSchema = new mongoose.Schema({
  name: String,
  relationship: String,
});


const EntrySchema = new mongoose.Schema({
  entryId: { type: String, unique: true }, // CUSTxxxx series
  form: { type: mongoose.Schema.Types.ObjectId, ref: 'FormSchema' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  data: mongoose.Schema.Types.Mixed, // dynamic fields
  familyMembers: [FamilyMemberSchema],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Entry', EntrySchema);
