const express = require('express');
const {ordersIntake} = require('../controllers/takeorder.js');



const router = express.Router();

router.post("/", ordersIntake);
module.exports = router;

