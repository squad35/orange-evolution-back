const UserItem = require('../controllers/userItemController.js');
const express = require('express');

const router = express.Router();

router.post('/', UserItem.create);
router.put('/:id', UserItem.update);
router.get('/', UserItem.getByUserEmail);

module.exports = router;