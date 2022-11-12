const Trail = require('../controllers/trailController.js');
const express = require('express');

const router = express.Router();

router.get('/actives', Trail.getActive);
router.get('/:id', Trail.getById);
router.put('/:id', Trail.update);
router.get('/', Trail.getAll);
router.post('/', Trail.create);

module.exports = router;