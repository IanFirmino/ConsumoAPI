const knex = require('../database/knex');

exports.findAll = () => {
    knex.select().table('games').then(result => {
        return [true, result];
    }).catch(err => {
        return [false, err];
    });
}

exports.findOne = (whereClause) => {
    knex('games').where(whereClause).select().then(result => {
        return [true, result];
    }).catch(err => {
        return [false, err];
    });
}

exports.delete = (whereClause) => {
    knex('games').where(whereClause).del().then(result => {
        return [true, result];
    }).catch(err => {
        return [false, err];
    });
}

exports.update = (whereClause, updateValue) => {
    knex('games').where(whereClause).update(updateValue).then(result => {
        return [true, result];
    }).catch(err => {
        return [false, err];
    });
}

exports.createOne = (values) => {
    knex('games').insert(values).then(result => {
        return [true, result];
    }).catch(err => {
        return [false, err];
    }); 
}
