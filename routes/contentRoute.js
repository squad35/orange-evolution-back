const Content = require('../controllers/contentController.js');
const express = require('express');

const router = express.Router();

router.get('/:id', Content.getById);
router.get('/', Content.getAll);
router.post('/', Content.create);

module.exports = router;