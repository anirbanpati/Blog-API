const dotenv = require('dotenv');
const express = require('express');
const app = express();
const connectDB = require('./config/DB');
const { PORT } = require('./constants');
const path = require('path');
const authRoutes = require('./routes/authRoutes');
const blogRoutes = require('./routes/blogRoutes');

dotenv.config();
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
