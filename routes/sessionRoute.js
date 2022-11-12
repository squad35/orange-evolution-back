const Session = require('../controllers/sessionController.js');
const express = require('express');

const router = express.Router();

router.get('/:id', Session.getByTrail);
router.post('/', Session.create);
router.delete('/', Session.deleteById);

module.exports = router;