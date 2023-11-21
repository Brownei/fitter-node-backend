require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

const middlewares = require('./utils/middlewares');
const api = require('./api');
const Sequelize = require('./utils/database');
const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({
  origin: '*'
}));
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
