require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');
const app = express();

const postRoute = require('./routes/posts');

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('DB connect'))
.catch((e) => console.log(e));

mongoose.Promise = global.Promise;

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use('/files', express.static(path.resolve(__dirname, '..', 'temp', 'uploads')));

app.use('/api', postRoute);

app.listen(5555, () => {
    console.log('Backend is running')
})