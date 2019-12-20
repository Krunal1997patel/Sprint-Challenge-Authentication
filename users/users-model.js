const databass = require('../database/dbConfig.js');

module.exports = {
    allUser,
    FindByUsername,
    addUser
}

function allUser(){
    return databass('users').select('id', 'username').orderBy('id')
}

function FindByUsername(name){
    return databass('users').select('id', 'username', 'password').where(name).first()
}

function addUser(data){
    return databass('users').insert(data, 'id')
    .then(ids => {
        const [id] = ids;
        return userId(id)
    })
}

function userId(id){
    return databass('users').select('id', 'username').where({ id }).first()
}