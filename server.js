const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');

require('dotenv').config();

const { users, candidates, vacancies } = require('./models');

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true, useUnifiedTopology: true,
    dbName: process.env.DB_NAME
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error: '));

const app = express();
const port = 8080;

app.use(express.json());
app.use(cors());

app.get('/users', async (req, res) => {
    const results = await users.find({});
    res.json(results);
});

app.get('/candidates', async (req, res) => {
    const results = await candidates.find({});
    res.json(results);
});

app.get('/vacancies', async (req, res) => {
    const results = await vacancies.find({});
    res.json(results);
});

app.post('/login', async (req, res) => {
    const results = await users.find(req.body);
    results[0] ? res.status(200).send(results) : res.status(204).send()
});

app.listen(process.env.PORT || 8080, () => {
    console.log('nJobs backend is up and running')
});
