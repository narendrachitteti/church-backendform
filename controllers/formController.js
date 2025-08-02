const FormSchema = require('../models/FormSchema');

exports.getForms = async (req, res) => {
  try {
    const forms = await FormSchema.find();
    res.json(forms);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createForm = async (req, res) => {
  try {
    const { name, fields } = req.body;
    const form = new FormSchema({ name, fields, createdBy: req.user ? req.user.id : null });
    await form.save();
    res.status(201).json(form);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateForm = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, fields } = req.body;
    const form = await FormSchema.findByIdAndUpdate(id, { name, fields }, { new: true });
    res.json(form);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteForm = async (req, res) => {
  try {
    const { id } = req.params;
    await FormSchema.findByIdAndDelete(id);
    res.json({ message: 'Form deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
