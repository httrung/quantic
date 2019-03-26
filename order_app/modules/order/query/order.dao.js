const logger = require('../../utils/logger');
const DBManager = require('../../utils/database_manager');

let dbManager;
let sequelize;

class OrderDao {
    constructor() {
        dbManager = new DBManager();
        if (dbManager.checkInitDB()) {
            sequelize = dbManager.getSequelize();            
        }
    }

    getOrderById(orderId) {
        logger.info('DAO :: getOrderById', orderId);
        let sql = 'SELECT id, state_id as stateId, ';
        sql += 'name, notes, order_date as orderDate, total ';
        sql += 'FROM `order` ';
        sql += 'WHERE id = :orderId ';
        sql += 'LIMIT 1;';
        //logger.info('SQL', sql);

        return sequelize.query(sql,
                { 
                    replacements: { orderId: orderId }, 
                    type: sequelize.QueryTypes.SELECT 
                }
            );
    }

    transaction(txnFunction) {
        return sequelize.transaction(txnFunction);
    }
}

module.exports = OrderDao;