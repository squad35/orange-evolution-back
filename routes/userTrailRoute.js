const UserTrail = require('../controllers/userTrailController.js');
const express = require('express');

const router = express.Router();

router.put('/:id', UserTrail.update);
router.post('/', UserTrail.create);
router.get('/', UserTrail.getByUserEmail);

module.exports = router;