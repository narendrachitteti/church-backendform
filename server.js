const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
require("dotenv").config();

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const formRoutes = require('./routes/formRoutes');
const entryRoutes = require('./routes/entryRoutes');

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/forms', formRoutes);
app.use('/api/entries', entryRoutes);

app.get('/', (req, res) => {
  res.send('Church Management API Running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
