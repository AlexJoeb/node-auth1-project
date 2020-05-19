const router = require('express').Router();

const {
    validateLogin,
    protected
} = require('./UserValidations');

router.get('/login', validateLogin, (req, res) => {
    req.session.username = req.user.username;
    console.log(req.session);
    return res.status(200).json({ message: `Welcome ${req.user.username}!`});
});

router.get('/logout', protected, (req, res) => {
    if (!req.session) return res.status(203).json({ message: `User was not logged in.` });
    else req.session.destroy(err => {
        if (err) return res.status(500).json(err);
        else res.status(200).json({ message: `User was logged out.` });
    });
});

module.exports = router;