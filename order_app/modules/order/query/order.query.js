const logger = require('../../utils/logger');
const Promise = require('bluebird');
const OrderDao = require('./order.dao');
const OrderDto = require('./../dto/order.dto');

let dao;
class OrderQueryService {
    constructor(){
        //logger.info('Constructor of OrderQueryService');
        dao = new OrderDao();
    }

    getOrderById(orderId) {
        logger.info('check order ::', orderId);    
        return dao.getOrderById(orderId).then((result) => {
            if (!result || result.length === 0) {
                return Promise.reject(new Error('No Order found!'));
                //throw new Error('No Order found!');
            }
            let order = result[0];
            //logger.info('query result::' + JSON.stringify(order));
            
            let dto = new OrderDto(order.id,
                order.stateId,
                order.name,
                order.notes,
                order.orderDate,
                order.total);
            return Promise.resolve(dto);
        }); 
    }
    
}

module.exports = OrderQueryService;