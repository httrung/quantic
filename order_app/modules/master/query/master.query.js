const logger = require("./../../utils/logger");
const Promise = require("bluebird");
const MasterDao = require("./master.dao");
const StateDto = require("../dto/state.dto");

let dao;
class MasterQueryService {
  constructor() {
    dao = new MasterDao();
  }

  /*
   * get states
   */
  getStates() {
    logger.info("get states");
    return dao.getStates().then(result => {
      if (!result) {
        // || result.length === 0
        return Promise.reject(new Error("No state found!"));
      }
      let dtos = [];
      let dto;
      result.forEach(item => {
        dto = new StateDto(item.id, item.name);
        dtos.push(dto);
      });

      return Promise.resolve(dtos);
    });
  }
  /*
   * get state by id
   */
  getStateById(stateId) {
    logger.info("get state by id", stateId);
    return dao.getStateById(stateId).then(result => {
      if (!result) {
        // || result.length === 0
        return Promise.reject(new Error("No state found!"));
      }
      let item = result[0];
      let dto = new StateDto(item.id, item.name);
      
      return Promise.resolve(dto);
    });
  }
}

module.exports = MasterQueryService;
