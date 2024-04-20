const router = require('express').Router();
const passport = require('passport');
const isAuth = require('./authMiddleware').isAuth;
const express = require('express');

const {
	loginFailure,
	loginSuccess,
	getRegister,
	getIndex,
	getLogin,
	getLogout,
	postRegister
} = require('../controllers/userController');

router.get('/', getIndex);

router.get('/login', getLogin);

router.get('/register', getRegister);
router.post('/register', postRegister);

router.get('/logout', getLogout);


// POST LOGIN
// Route for handling user login
// This route uses passport.authenticate() middleware with 'local' strategy
// It allows the route if the provided credentials are valid
router.post('/login', passport.authenticate('local', {
    successRedirect: '/login-success', // Redirect to /login-success on successful login
    failureRedirect: '/login-failure', // Redirect to /login-failure on failed login
    failureFlash: true // Enable flash messages for failure
}));

// Route for handling successful login
router.get('/login-success', (req, res) => {
    res.send('Login successful!');
});

// Route for handling failed login
router.get('/login-failure', (req, res) => {
    res.send('Login failed!');
});

// Middleware to check for authorized access before allowing access to protected material
router.use((req, res, next) => {
    // Check if user is authenticated
    if (req.isAuthenticated()) {
        // User is authenticated, proceed to next middleware
        next();
    } else {
        // User is not authenticated, redirect to login page
        res.redirect('/login');
    }
});


module.exports = router;


