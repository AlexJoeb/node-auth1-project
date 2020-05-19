const router = require('express').Router();
const db = require('../data/db-helper');

const {
    validateLogin,
    validateUser,
    validateUpdate,
    protected
} = require('./UserValidations');

router.get('/', protected, (req, res) => {
    return db.getAllUsers()
        .then(users => res.status(200).json(users))
        .catch(error => res.status(500).json(error));
});

router.get('/:id', protected, (req, res) => {
    return db.getUserById(req.params.id)
        .then(user => user ? res.status(200).json(user) : res.status(404).json({ message: `User not found.` }))
        .catch(error => res.status(500).json(error));
});

router.post('/', protected, validateUser, (req, res) => {
    return db.newUser(req.user)
        .then(resp => res.status(201).send(`${req.user.username} created successfully and logged in.`))
        .catch(error => res.status(500).json(error));
});

router.put('/:id', protected, validateUpdate, (req, res) => {
    return db.updateUser(req.params.id, req.user)
        .then(resp => res.status(200).json(resp))
        .catch(error => res.status(500).json(error));
})

router.delete('/:id', protected, (req, res) => {
    return db.removeUser(req.params.id)
        .then(res => res.status(200).json({ message: `Succesfully removed ID: ${req.params.id}` }))
        .catch(error => res.status(500).json(error));
})

module.exports = router;