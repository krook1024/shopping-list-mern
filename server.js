const express = require('express');
const mongoose = require('mongoose');
const config = require('config');

const app = express();

// Bodyparser Middleware
app.use(express.json());

// DB config
const db = config.get('mongoURI');

// Connect to Mongo
try {
    mongoose.connect(
        db,
        { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
        () => console.log('MongoDB connected'))
} catch (err) {
    console.log(err);
}

// Use routes
app.use('/api/items', require('./routes/api/items'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));