const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

// Item Model
const Item = require('../../models/Item');

// @route   GET /api/items
// @desc    Get all items.
// @access  Public
router.get('/', async (req, res, next) => {
    try {
        const items = await Item.find().sort({ date: -1 });
        res.json(items);
    } catch (err) {
        res.status(500).json({
                success: false
        });
    }
});

// @route   POST /api/items
// @desc    Create a new item.
// @access  Private
router.post('/', auth, async (req, res, next) => {
    const newItem = new Item({
        name: req.body.name
    });
    
    try {
        await newItem.save()
        res.json(newItem);
    } catch(err) {
       res.status(500).send({
            message: 'internal server error'
       });
    }
});

// @route   DELETE /api/items/:id
// @desc    Delete an item.
// @access  Private
router.delete('/:id', auth, async (req, res, next) => {
    try {
        const item = await Item.findById(req.params.id);
        item.remove();
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'internal server error'
        });
    }
});

module.exports = router;