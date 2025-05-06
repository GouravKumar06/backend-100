const express = require('express');
const products = require('../data/products');
const router = express.Router();

router.get('/products', (req, res) => {
    res.send(products);
});


module.exports = router;