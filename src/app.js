require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const passport = require('passport');
const Sequelize = require('./utils/database');
const session = require('express-session')

const middlewares = require('./utils/middlewares');
const api = require('./api');
const User = require('./api/user/model')

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'Connection successful!',
  });
});

//Synchronize all models created to the database
Sequelize.sync({ force: false }).then(() => {
  console.log("Synchronization successful");
}).catch((error) => {
  console.log("Error with the synchronization", error);
});

app.use('/', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

module.exports = app;
