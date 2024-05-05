const express = require('express');
const router = express.Router();

const contController = require('../controllers/contacts');

router.get('/', contController.getAll);
router.get('/:id', contController.getSingle);

module.exports = router;