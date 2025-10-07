const express = require('express');

const router = express.Router();

router.put('/signup', authController.signup);

module.exports = router;
