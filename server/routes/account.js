const express = require('express');
const authMiddleware = require('../middleware/auth');
const { pool } = require('../db/connect');

//router object
const Router = express.Router();

/* Account retrival and creation*/
/* Backend Database logic for account routing */

const getAccountByAccountId = async function (account_id) {
    try {
        const result = await pool.query(
            'select * from account a inner join customer c on a.userid = c.userid where a.account_id=$1',
            [account_id]
        );
    return result.rows[0];
} catch (error) {
    return null;
}
};


async function getAccountByEmail(email) {
    try {

        const result = await pool.query(
            'select * from account a inner join customer c on a.userid = c.userid where c.email=$1',
            [email]
        );

        delete result.rows[0].password;
        return result.rows[0];
    } catch (error) {
        return null;
    }
}

{/* Routing */}

Router.get('/account', authMiddleware, async (req, res) => {

try{ 
    const result = await getAccountByEmail(req.user.email);
    if (result) {
        res.send({ account: result});
    } else {
        res.status(400).send({
            get_error: 'Account details does not exist.'
        });
    }
} catch (error) {
    res.status(400).send({
        get_error: 'Error while getting account details... try again later.'
    });
}
});

Router.post('/account', authMiddleware, async (req, res) => {
const {account_no} = req.body;
try {
    await pool.query(
        'insert into account(userid, account_no) values($1,$2)',
        [ req.user.userid, account_no] 
    );
    res.status(201).send();
} catch (error) {
    res.send({
        add_error: 'Error while adding new account.. Try again later.'
    });
}
});


//
Router.patch('/account', authMiddleware, async (req, res) => {
    const { account_no } = req.body;
    try {
      const result = await pool.query(
        'update account set account_no=$1 where userid=$2 returning *',
        [account_no, req.user.userid]
      );
      res.send({ account: result.rows[0] });
    } catch (error) {
      res.send({
        update_error: 'Error while updating account..Try again later.'
      });
    }
  });
  
  module.exports = { Router, getAccountByAccountId };