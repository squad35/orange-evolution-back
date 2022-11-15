const Content = require('../controllers/contentController.js');
const express = require('express');

const router = express.Router();

router.get('/actives', Content.getActive);
router.get('/:id', Content.getById);
router.get('/find-by-name/:name', Content.getByName);
router.put('/:id', Content.update);
router.get('/', Content.getAll);
router.post('/', Content.create);

module.exports = router;
