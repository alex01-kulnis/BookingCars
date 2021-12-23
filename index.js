require('dotenv').config();
const express = require('express');
const router = require('./routes/index');
// const pgp = require('pg-promise')(/*options*/);

const PORT = process.env.PORT || 7000;

const app = express();
app.use(express.json());

app.use('/api', router);

// // Обработка ошибок, последний Middleware
// app.use(errorHandler)

// var db = pgp('postgres://postgres:1@localhost:5432/BookingCar');

const start = async () => {
  try {
    // db.one('SELECT $1 AS value', 123)
    //   .then(function (data) {
    //     console.log('DATA:', data.value);
    //   })
    //   .catch(function (error) {
    //     console.log('ERROR:', error);
    //   });
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
