const router = require('express').Router();
const userController = require('../controllers/name')

router.get('/', (req, res) => { userController.getName});

module.exports = router