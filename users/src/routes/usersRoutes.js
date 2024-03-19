const express = require('express');
const UserController = require('../controllers/UserController');

const router = express.Router();

router.get('/users', UserController.index);
router.get('/users/create', UserController.create);
router.post('/users/create', UserController.store);
router.post('/users/delete', UserController.destroy);
router.get('/users/edit/:id', UserController.edit);
router.post('/users/edit/:id', UserController.update);

module.exports = router;