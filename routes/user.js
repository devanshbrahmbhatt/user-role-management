const express = require('express');
const userRouter = express.Router();
const { signUp, login, userList, checkModuleAccess, updateMany, updateManyUsers } = require('../controllers/userController');
const { auth } = require('../controllers/authController');

userRouter.post('/signUp', signUp);
userRouter.post('/login', login);
userRouter.patch('/updateManyUsers',auth, updateManyUsers);
userRouter.patch('/updateMany',auth, updateMany);
userRouter.get('/userList',auth, userList);
userRouter.get('/checkModuleAccess',auth, checkModuleAccess);

module.exports = userRouter;