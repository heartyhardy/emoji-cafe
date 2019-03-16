const express = require('express');
const router = express.Router();

const {
        ShowUserRegistration,
        RegisterUser
     } = require('../controllers/user-controller');

// Register user form
router.get('/register', ShowUserRegistration);

// Post a new user
router.post('/complete-registration', RegisterUser);

exports.router = router;