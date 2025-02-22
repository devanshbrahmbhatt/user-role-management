const express = require('express');
const rolesRoute = new express.Router();
const { createRole, updateRole } = require('../controllers/roleController');
const { auth } = require('../controllers/authController');

rolesRoute.post('/createRole', createRole);
rolesRoute.patch('/updateRole', auth, updateRole);

module.exports = rolesRoute;

