const BaseDto = require('./base.dto');
class StateDto extends BaseDto{
    constructor(id = -1, code = '') {
        super(id, code);
    }
}
module.exports = StateDto;