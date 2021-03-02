const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');

require('dotenv').config();

const { users, candidates, vacancies } = require('./models');
const { DB_HOST, DB_USER, DB_PASS, DB_PORT, DB_NAME } = process.env;

mongoose.connect(`mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}`, {
    useNewUrlParser: true, useUnifiedTopology: true,
    dbName: `${DB_NAME}`
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
    results[0] ? res.status(200).send() : res.status(401).send()
});

app.listen(port, () => {
    console.log(`nJobs backend is listening on port ${port}`)
});