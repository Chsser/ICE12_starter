const connection = require('../config/database');
const { generatePassword, validatePassword } = require('../lib/passwordUtils');
const User = connection.models.User;

// INDEX
const getIndex = (req, res, next) => {
    res.render('index');
};

// REGISTER GET
const getRegister = (req, res, next) => {
    res.render('register');
};

// REGISTER POST - LEVERAGES GENERATE PASSWORD TO STORE A HASHED EMAIL
const postRegister = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await generatePassword(password);
        await User.create({ username, password: hashedPassword });
        res.redirect('/login');
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
};

// LOGIN GET
const getLogin = (req, res, next) => {
    res.render('login');
};

// LOGIN POST SUCCESS
const loginSuccess = (req, res, next) => {
    res.send('Login successful!');
};

// LOGIN POST FAILURE
const loginFailure = (req, res, next) => {
    res.send('Login failed!');
};

// LOGOUT GET
const getLogout = (req, res, next) => {
    req.logout();
    res.redirect('/');
};

module.exports = {
    getIndex,
    getRegister,
    postRegister,
    getLogin,
    loginSuccess,
    loginFailure,
    getLogout
};
