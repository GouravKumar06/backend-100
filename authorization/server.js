// global import
const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const cookieParser = require('cookie-parser');

// local import
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');

// Initialize express app
const app = express();

// global middleware
app.use(express.json());
app.use(cookieParser());

//local middleware
app.use('/api/v1/auth', authRoutes);

const PORT = process.env.PORT || 3000;


app.get('/authorize', (req, res) => {
    res.send('Hello, World!');
});

// Connect to MongoDB
connectDB();

app.listen(PORT, () => {
  console.log(`Authorization server is running on port ${PORT}`);
});