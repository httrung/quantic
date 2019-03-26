const logger = require("./../../utils/logger");
const DBManager = require("./../../utils/database_manager");
let dbManager;
let sequelize;

class MasterDao {
  constructor() {
    dbManager = new DBManager();
    if (dbManager.checkInitDB()) {
      sequelize = dbManager.getSequelize();
    }
  }

  /*
   * get states
   */
  getStates() {
    logger.info("DAO :: getStates");
    let sql = "SELECT id, name ";
    sql += "FROM state";
    //logger.info('SQL', sql);

    return sequelize.query(sql, {
      type: sequelize.QueryTypes.SELECT
    });
  }
  /*
   * get states
   */
  getStateById(stateId) {
    logger.info("DAO :: getStateById");
    let sql = "SELECT id, name ";
    sql += "FROM state ";
    sql += "WHERE id = :stateId";
    //logger.info('SQL', sql);

    return sequelize.query(sql, {
      replacements: { stateId: stateId },
      type: sequelize.QueryTypes.SELECT
    });
  }

  /*
   * transaction for this dao
   */
  transaction(txnFunction) {
    return sequelize.transaction(txnFunction);
  }
}

module.exports = MasterDao;
