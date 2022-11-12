const Item = require('../controllers/itemController.js');
const express = require('express');

const router = express.Router();

router.get('/session/:id', Item.getBySession);
router.get('/actives', Item.getActive);
router.put('/:id', Item.update);
router.get('/', Item.getAll);
router.post('/', Item.create);

module.exports = router;