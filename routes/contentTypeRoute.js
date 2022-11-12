const ContentType = require('../controllers/contentTypeController.js');
const express = require('express');

const router = express.Router();

router.get('/', ContentType.getAll);
router.post('/', ContentType.create);
router.delete('/', ContentType.deleteById);

module.exports = router;