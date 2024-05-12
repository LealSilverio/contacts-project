const router = require('express').Router();

const contactsController = require('../controllers/contacts');

router.get('/', contactsController.getData);
router.get('/:id', contactsController.getByID);
router.post('/', contactsController.create);
router.put('/:id', contactsController.update);
router.delete('/:id', contactsController.delete);

module.exports = router;