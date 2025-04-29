const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
dotenv.config();
const app = express();

//local imports
const productRoutes = require('./routes/productRoutes');
const bookRoutes = require('./routes/bookRoutes');

//global middlewares
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Hello World!');
});


//local middlewares
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/books", bookRoutes);


connectDB();
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})