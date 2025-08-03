
const Entry = require('../models/Entry');

exports.getEntries = async (req, res) => {
  try {
    const entries = await Entry.find().populate('user').populate('form');
    res.json(entries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.deleteEntry = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Entry.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ error: 'Entry not found' });
    }
    res.json({ message: 'Entry deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.createEntry = async (req, res) => {
  try {
    const { form, data, familyMembers, user } = req.body;

    // Generate entryId (CUSTxxxx series)
    const lastEntry = await Entry.findOne({}, {}, { sort: { createdAt: -1 } });
    let nextId = 1;
    if (lastEntry && lastEntry.entryId) {
      const match = lastEntry.entryId.match(/CUST(\d+)/);
      if (match) nextId = parseInt(match[1], 10) + 1;
    }
    const entryId = `CUST${String(nextId).padStart(4, '0')}`;

    const entry = new Entry({
      entryId,
      form: form || null,
      user: user || null,
      data,
      familyMembers,
    });
    await entry.save();

    res.status(201).json(entry);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateEntry = async (req, res) => {
  try {
    const { id } = req.params;
    const { data } = req.body;
    const entry = await Entry.findByIdAndUpdate(id, { data }, { new: true });
    res.json(entry);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

