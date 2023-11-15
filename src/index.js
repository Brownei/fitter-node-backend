const app = require('./app');
const Sequelize = require('./utils/database');

const port = process.env.PORT || 5000;
app.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`Listening: http://localhost:${port}`);
  /* eslint-enable no-console */
});

Sequelize.authenticate().then(() => {
  logger.info("Connection established with MYSQL database");
  console.log("Connection established with MYSQL database");
}).catch((error) => {
  logger.error("Error establishing connection with MYSQL database", error);
  console.log("Error establishing connection with MYSQL database", error);
});
