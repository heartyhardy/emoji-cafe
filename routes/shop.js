const express = require('express');
const router = express.Router();

//import controllers
const { GetShopWindow } = require('../controllers/shop-controller');

router.get('/', GetShopWindow);

exports.router = router;