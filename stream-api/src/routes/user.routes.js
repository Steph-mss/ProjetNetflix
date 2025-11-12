const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const auth = require('../middlewares/auth');
const roles = require('../middlewares/roles');

router.get('/', auth, roles(['admin']), userController.getUsers);
router.get('/:id', auth, roles(['admin']), userController.getUserById);
router.put('/:id', auth, roles(['admin']), userController.updateUser);
router.delete('/:id', auth, roles(['admin']), userController.deleteUser);

module.exports = router;
