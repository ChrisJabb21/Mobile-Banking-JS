CREATE DATABASE banking_app;

/* use \c to connect to database*/
\c banking_appl;


CREATE TABLE customer (
    userid BIGSERIAL PRIMARY KEY NOT NULL,
    first_name VARCHAR(32) NOT NULL,
    last_name VARCHAR(32) NOT NULL,
    email VARCHAR(32) NOT NULL,
    pass_word VARCHAR(255) NOT NULL,
    unique(email)
);

CREATE TABLE TOKENS(
    id BIGSERIAL PRIMARY KEY NOT NULL,
    access_token VARCHAR(500) NOT NULL,
     userid BIGSERIAL NOT NULL,
    FOREIGN KEY(userid) REFERENCES customer(userid);
);

//TODO add to online test database and test

CREATE TABLE account(
    userid BIGSERIAL NOT NULL,
    account_id BIGSERIAL PRIMARY KEY NOT NULL,
    account_no BIGINT NOT NULL,
    total_balance DECIMAL NOT NULL DEFAULT 0,
    /*account_type ENUM('Checking', 'Savings') NOT NULL */
    /* bank_name VARCHAR(50) NOT NULL,*/
    FOREIGN KEY(userid) references customer(userid)
);



CREATE TABLE transactions(
    id BIGSERIAL PRIMARY KEY NOT NULL,
    transaction_date TIMESTAMP NOT NULL,
    /*account_type ENUM('Deposit', 'Withdraw') NOT NULL,*/
    deposit_amount DECIMAL NULL,
    withdraw_amount DECIMAL NULL,
    remaining_balance DECIMAL NOT NULL DEFAULT 0,
    account_id BIGSERIAL NOT NULL,
    FOREIGN KEY(account_id) REFERENCES account(account_id)
);