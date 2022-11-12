const Author = require('../controllers/authorController.js');
const express = require('express');

const router = express.Router();

router.get('/', Author.getAll);

module.exports = router;