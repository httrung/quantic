const logger = require("./../utils/logger");
const httpCodes = require("http-status-codes");
const config = require("../../config/auth/info");

class Authorization {
  constructor() {}

  isAuthorized(req, res, next) {
    logger.info("checking authorization!!");
    let token = req.token;
    let error;

    if (token) {
      if (token === config.TOKEN) {
        logger.info("Token is valid!!");
        next();
      } else {
        error = new Error("Token is not valid!");
        logger.error(error.message);
        return res
          .status(httpCodes.UNAUTHORIZED)
          .json({ error: error.message });
      }
    } else {
      error = new Error("Token is not provided");
      logger.error(error.message);
      return res.status(httpCodes.UNAUTHORIZED).json({ error: error.message });
    }
  }
}

module.exports = Authorization;
