const http = require("http");
const logger = require("./modules/utils/logger");
const init = require("./modules/utils/config_manager");
const DBManager = require("./modules/utils/database_manager");
const AppInfo = require("./config/app/info");
const app = require("./modules/webserver/server");
const router = require("./modules/routers");

const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./config/swagger/swagger.yaml");
//api document
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));


let dbManager;
//init config
init()
  .then(version => {
    logger.info("Running version", version);
    dbManager = new DBManager();
    return dbManager.init();
  })
  .then(dbResult => {
    logger.info(dbResult);
    // Routes
    router.mainRouting(app);
    // Server
    const server = http.createServer(app).listen(AppInfo.port, () => {
      logger.info("HTTP Order Server listening on port:", AppInfo.port);
    });
  })
  .catch(err => {
    console.log(err);
    //console.log( err.stack );
    console.log("Failed to start order server!");

    // Give time for console to log error out
    setTimeout(function() {
      process.exit(1);
    }, 1000);
  });
