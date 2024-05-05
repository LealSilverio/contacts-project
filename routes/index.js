const router = require('express').Router();
const baseController = require('../controllers/baseController')

router.get('/', baseController.base);
router.get('/contacts', require('./contacts'));

module.exports = router