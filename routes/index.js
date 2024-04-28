const router = require('express').Router();
const nameController = require('../controllers/name')

router.get('/', nameController.getName);

module.exports = router