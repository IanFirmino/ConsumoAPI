const knex = require('knex')({
    cliente: 'mysql',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: '1234',
        database: 'ggames'
    }
});

module.exports = knex;
