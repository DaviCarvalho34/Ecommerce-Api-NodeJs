const express = require("express");
const { createUser, loginUser, getAllUser, getUser, deleteUser, updateUser, blockUser, unblockUser } = require("../controllers/userController.js");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware.js");


const router = express.Router();

router.post('/register', createUser);
router.post('/login', loginUser);
router.get('/all-users', getAllUser);
router.get('/:id', authMiddleware, isAdmin, getUser);
router.delete('/:id', deleteUser);
router.put('/edit-user', authMiddleware, updateUser);
router.put('/block-user/:id', authMiddleware, isAdmin, blockUser);
router.put('/unblock-user/:id', authMiddleware, isAdmin, unblockUser);

module.exports = router;