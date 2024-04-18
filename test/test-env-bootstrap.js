const app = require("../app.js");
const db = require("../src/models");
const My = require("../src/utils/My");
const sequelize = db.sequelize;


let server;


before(async () => {

  server = app.listen(0, () => { });
  await sequelize.sync({ force: true });
});


after(async () => {
  await sequelize.close();
  await server.close();
});


afterEach(async () => {

  // Delete table records after each test.
  // Get all models
  const models = Object.values(sequelize.models);

  // Delete all records from each table
  for (const model of models) {
    await model.destroy({ where: {}, truncate: true });
  }

});