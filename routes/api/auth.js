const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');

// Item Model
const Item = require('../../models/User');

// @route   POST /api/auth
// @desc    Auth user
// @access  Public
router.post('/', async (req, res, next) => {
    const { email, password } = req.body;

    // Validation
    if (! email || ! password) {
        return res.status(400).json({
            message: 'Please enter all fields.'
        });
    }

    // Check for existing
    User.findOne({ email })
        .then(user => {
            if ( ! user) return res.status(400).json({message: 'User already exists!'});

            // Validate pw
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if ( ! isMatch) return res.status(400).json({ message: 'Invalid cerendtials '});

                    jwt.sign(
                        { id: user.id },
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
                                token
                            });
                        }
                    );
                });
        }); 
});

// @route   GET /api/auth/user
// @desc    Get user data
// @access  Private
router.get('/user', auth, async (req, res) => {
    User.findById(req.user.id)
        .select('-password')
        .then(user => res.json(user));
});

module.exports = router;