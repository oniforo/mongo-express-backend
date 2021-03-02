const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');

const { users, candidates, vacancies } = require('./models');

mongoose.connect('mongodb://root:password@localhost:27017', {
    useNewUrlParser: true, useUnifiedTopology: true,
    dbName: 'njobs'
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

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