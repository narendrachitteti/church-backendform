const User = require('../models/User');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: 'data-entry' });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = new User({ name, email, password, role: 'data-entry' });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;
    const user = await User.findByIdAndUpdate(id, { name, email }, { new: true });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
