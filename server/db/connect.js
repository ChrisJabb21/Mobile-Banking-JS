const { Pool } = require('pg');

const pool = new Pool({
    user:'nqrwoocv',
    password: 'TT7AeNvd1L7IEjyvsU8mQocesciES4n9',
    host: 'ruby.db.elephantsql.com',
    port:'5432',
    database:'nqrwoocv'
});

module.exports = { pool };

/* Server 	ruby.db.elephantsql.com (ruby-01)
User & Default database 	nqrwoocv
Password 	TT7AeNvd1L7IEjyvsU8mQocesciES4n9
URL 	postgres://nqrwoocv:TT7AeNvd1L7IEjyvsU8mQocesciES4n9@ruby.db.elephantsql.com:5432/nqrwoocv */