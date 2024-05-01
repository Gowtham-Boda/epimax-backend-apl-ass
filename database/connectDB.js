const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'b7izgdjlm2wvam1dx4hb-mysql.services.clever-cloud.com',
    user: 'u2flrbr6uxgzg8ie',
    password: 'ZHlwZVGpSZtN2iUeTRZe',
    database: 'b7izgdjlm2wvam1dx4hb'
});

module.exports = pool;