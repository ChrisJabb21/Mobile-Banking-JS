/*Auth.js - check if the data coming to this api contains the fields needed for signup,login, and logout.
Data sent from client side will be inside the req.body object and returned as a JSON with app.use(express.json())
*/
const express = require('express');
const bcrypt = require('bcryptjs');
const { pool } = require('../db/connect'); //use a connection pool to handle multiple queries and gives a faster response.
const { validateUser, isInvalidField, generateAuthToken } = require('../utils/common');
/* const authMiddleware = require('../middleware/auth'); */

const Router = express.Router();

/***  post routing for responding to client requests for
 *  signup endpoint URI and handling logic  
 * */
Router.post('/signup', async (req, res) => {
    try {
        const { first_name, last_name, email, password } = req.body;
        const validFieldsToUpdate = [
            'first_name',
            'last_name',
            'email',
            'password'
        ];

        const retrievedFields = Object.keys(req.body);

        const isInvalidFieldProvided = isInvalidField(
            retrievedFields,
            validFieldsToUpdate
        );

        //If we have an invalid field return a 400 message 
        if (isInvalidFieldProvided) {
            return res.status(400).send({
                    signup_error: 'Invalid field.'
                });
        }

        //Check if there is already an email registered.
        const result = await pool.query(
            'select count(*) as count from customer where email=$1',
            [email]
        );
        const count = result.rows[0].count;
        if (count > 0) {
            return res.status(400).send({
                signup_error: 'User with this email address already exists.'
            });
        }

        //do an insert on customer row and set password used to hashed password.
        const hashedPassword = await bcrypt.hash(password, 8);
        await pool.query(
            'insert into customer(first_name, last_name, email, password) values ($1,$2,$3,$4)',
            [first_name, last_name, email, hashedPassword]
        );
        res.status(201).send();
        //for client errors 
    } catch (error) {
        res.status(400).send({
            signup_error: 'Status 400: Error while signing up.. Try again later.'
        });
    }
});

// post routing method for handling  logic in signin route
Router.post('/signin', async (req, res) => {
try {
    const { email, password } = req.body;
    const user = await validateUser(email, password);
    if (!user) {
        res.status(400).send({
            signin_error: 'Email/password does not match.'
        });
    }
    //Generate a auth token for user and add it to token table/
    const token = await generateAuthToken(user);
    const result = await pool(
        'insert into tokens(access_token, userid) values($1,$2) returning *',
        [token, user.userid]
    );
    //if 
    if(!result.rows[0]){
        return res.status(400).send({
            signin_error: 'Error while signing in.. Try again later.'
        });
    }
    user.token = result.rows[0].access_token;
    res.send(user); 
    } catch (error) {
        res.status(400).send({ 
          signin_error: 'Email and password does not match.'
        });
    }
  });

    //post method for logout out URI path
    Router.post('/logout', /* authMiddleware, */ async (req,res) => {
        try {
            const { userid, access_token } = req.user;
            await pool.query('delete from tokens where userid=$1 and access_token=$2', [
                userid,
                access_token
            ]);
            res.send();
        } catch (error) {
            res.status(400).send({
                logout_error: 'Error while logging out.. Try again later.'
            });
        }
});

module.exports = Router;

//TODO  had with registration and making a token. 