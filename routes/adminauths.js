const express = require('express')
const {registeradmin, loginadmin, logoutadmin } = require('../controllers/adminauth.js');
const router = express.Router();

router.post("/", registeradmin);
router.post("/login", loginadmin);
router.post("/logout", logoutadmin);

module.exports = router;