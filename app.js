require('dotenv').config();
const mongoPass = process.env.MONGO_PASS;
const mongoUser = process.env.MONGO_USER;
const mongoAddr = process.env.MONGO_ADDR;
const MONGODB_URI = `mongodb+srv://${mongoUser}:${mongoPass}@${mongoAddr}/messages?retryWrites=true`;
// const MONGODB_URI = `mongodb+srv://${mongoUser}:${mongoPass}@${mongoAddr}/messages`;

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const feedRoutes = require('./routes/feed');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/feed', feedRoutes);

mongoose
    .connect(MONGODB_URI)
    .then((result) => {
        app.listen(8080);
    })
    .catch((err) => {
        console.log(err);
    });
