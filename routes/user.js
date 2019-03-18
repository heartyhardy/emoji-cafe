const express = require('express');
const router = express.Router();

const {
        ShowUserRegistration,
        ShowUserLogin,
        RegisterUser
     } = require('../controllers/user-controller');

// Register user form
router.get('/register', ShowUserRegistration);

// Post a new user
router.post('/complete-registration', RegisterUser);

// Login user form
router.get('/signin', ShowUserLogin);

exports.router = router;