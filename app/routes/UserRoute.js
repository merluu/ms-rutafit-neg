const express = require('express');
const router = express.Router();

const UserController = require('../controllers/UserController');

const userController = new UserController();

router.post('/', (req, res, next) => userController.save(req, res, next));

router.get('/', (req, res, next) => userController.findAll(req, res, next));

module.exports = router;