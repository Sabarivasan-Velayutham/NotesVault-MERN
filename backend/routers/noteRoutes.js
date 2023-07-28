

const express = require('express');
const { route } = require('./userRoutes');
const { getNotes, createNote, getNoteById, updateNote, deleteNote } = require('../controllers/noteController');
const { protect } = require('../middlewares/authMiddleware');
// const { registerUser, authUser } = require("../controllers/userControllers")

const router = express.Router()

// adding routes 
router.route('/').get(protect, getNotes); //calls protect middleware before displaying getNotes API
router.route('/create').post(protect, createNote);
router.route('/:id')
    .get(getNoteById)
    .put(protect, updateNote)
    .delete(protect, deleteNote);

module.exports = router;