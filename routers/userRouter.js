const express = require('express');
const userRouter = express.Router();
const { getUser, getUsers, updateUser, deleteUser, checkStats } = require('../controllers/userController');
const { verifyTokenAndAuth, verifyTokenAdmin } = require('../middlewares/verifyToken');

userRouter.route('/')
.get(getUsers);

userRouter.route('/stats')
.get(checkStats);

// mount the router level middleware
userRouter.use('/:id', verifyTokenAndAuth);

userRouter.route('/:id')
.patch(updateUser)
.delete(deleteUser);

userRouter.use(verifyTokenAdmin);
userRouter.route('/:id')
.get(getUser);

// userRouter.route('/stats')
// .get(checkStats);

// userRouter.route('/')
// .get(getUsers);

module.exports = userRouter;