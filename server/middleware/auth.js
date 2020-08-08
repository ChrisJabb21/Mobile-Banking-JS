const jwt = require('jsonwebtoken');
const { pool } = require('../db/connect');

const authMiddleware = async function (req, res, next) {
  try {
    const token = req.header('Authorization').split(' ')[1];
    const decoded = jwt.verify(token, process.env.secret);
    const result = await pool.query(
      'select c.userid,c.first_name,c.last_name,c.email,t.access_token from customer c inner join tokens t on c.userid=t.userid where t.access_token=$1 and t.userid=$2',
      [token, decoded.userid]
    );
    const user = result.rows[0];
    if (user) {
      req.user = user;
      req.token = token;
      next();
    } else {
      throw new Error('Error while authentication');
    }
  } catch (error) {
    res.status(400).send({
      auth_error: 'Authentication failed.'
    });
  }
};

module.exports = authMiddleware;