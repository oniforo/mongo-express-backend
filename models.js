const mongoose = require('mongoose');

const users = mongoose.model(
    'User', new mongoose.Schema(), 'users'
);

const candidates = mongoose.model(
    'Candidate', new mongoose.Schema(), 'candidates'
);

const vacancies = mongoose.model(
    'Vacancy', new mongoose.Schema(), 'vacancies'
);

module.exports = { users, candidates, vacancies };