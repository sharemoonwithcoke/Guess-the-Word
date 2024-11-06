const userModel = require('../models/userModel');
const uuid = require('crypto').randomUUID;
const { renderLoginPage } = require('../views/view');

exports.checkLogin = (req, res, next) => {
    const sid = req.cookies.sid;
    if (!sid || !userModel.isValidSession(sid)) {
        return res.send(renderLoginPage());
    }
    next();
};

exports.login = (req, res) => {
    const username = req.body.username.trim();
    if (!userModel.isValidUsername(username)) {
        return res.send(renderLoginPage('Invalid username'));
    }
    if (username === 'dog') {
        return res.send(renderLoginPage('"dog" is not allowed'));
    }

    const sid = uuid();
    userModel.createSession(sid, username);
    res.cookie('sid', sid);
    res.redirect('/');
};

exports.logout = (req, res) => {
    const sid = req.cookies.sid;
    if (sid) {
        userModel.removeSession(sid);
    }
    res.clearCookie('sid');
    res.redirect('/');
};
