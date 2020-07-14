const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

// Item Model
const User = require('../../models/User');

// @route   POST /api/users
// @desc    Register new user
// @access  Public
router.post('/', async (req, res, next) => {
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
        return res.status(400).json({
            message: 'Please enter all fields.',
        });
    }

    // Check for existing
    User.findOne({ email }).then(user => {
        if (user)
            return res.status(400).json({ message: 'User already exists!' });
    });

    const newUser = new User({ name, email, password });

    // Create salt & hash
    try {
        bcrypt.genSalt(10, (err, salt) => {
            if (err) throw err;

            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) throw err;

                newUser.password = hash;

                newUser.save().then(user => {
                    jwt.sign(
                        { id: user._id },
                        config.get('jwtSecret'),
                        { expiresIn: 3600 },
                        (err, token) => {
                            if (err) throw err;
                            res.json({
                                user: {
                                    id: user.id,
                                    name: user.name,
                                    email: user.email,
                                },
                                token,
                            });
                        }
                    );
                });
            });
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

module.exports = router;
