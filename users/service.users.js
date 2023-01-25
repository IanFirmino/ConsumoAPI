const knex = require('../database/knex');

exports.findUser = (email, password) =>{
    knex('users').where({email: email, password: password}).select().limit(1).then(result => {
        return [true, result]    
    }).catch(err => {
        return [false, err]
    });
}


