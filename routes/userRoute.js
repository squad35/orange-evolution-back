const User = require('../controllers/userController.js');
const express = require('express');

const router = express.Router();

router.get('/findUser', User.getByEmail);
router.get('/', User.getAll);
router.post('/', User.create);
router.put('/', User.update);

module.exports = router;