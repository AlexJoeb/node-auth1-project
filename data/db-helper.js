// * Knex Database (DBMS)
const knex = require('knex');
const config = require('../knexfile.js');
const db = knex(config[process.env.ENV || 'development']);

module.exports = {
    getAllUsers: () => db('users'),
    getUserById: id => db('users').where({ id }).first(),
    getUserByName: username => db('users').where({ username }).first(),
    newUser: user => db('users').insert(user).then(([id]) => this.getUserById(id)).catch(err => err),
    removeUser: id => db('users').where({ id }).del(),
    updateUser: (id, updates) => db('users').where({ id }).update(updates).then(resp => db('users').where({id}).first()).catch(err => err),
}