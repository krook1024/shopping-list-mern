const { decode } = require('jsonwebtoken');

const config = require('config');
const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    // Check for token
    const token = req.header('x-auth-token');

    if (!token)
        return res
            .status(401)
            .json({ message: 'No token, authorization failed.' });

    try {
        // Verify token
        const decoded = jwt.verify(token, config.get('jwtSecret'));

        // Add user from payload
        req.user = decoded;

        next();
    } catch (e) {
        return res
            .status(400)
            .json({ message: 'Bad token, authorization failed.' });
    }
}

module.exports = auth;
