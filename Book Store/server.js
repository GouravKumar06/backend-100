//global packages 
const express = require('express');
const dotenv = require('dotenv');
dotenv.config();


// local packages
const connectDB = require('./config/db');
const bookRoutes = require('./routes/bookRoutes');

// Initialize express app
const app = express();

//global middlewares
app.use(express.json());


//local middlewares
app.use('/api/v1/books', bookRoutes);

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Connect to MongoDB
connectDB().then(() => {
    console.log('Database connected successfully');
}).catch((error) => {
    console.error('Database connection failed:', error);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});