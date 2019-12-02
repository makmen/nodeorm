var Store = require('openrecord/store/mysql');

class Tsc extends Store.BaseModel{
    static definition(){
        // this is the `definition scope`
        this.validatesPresenceOf('Tu', 'Su', 'T', 'S')
    }
}

module.exports = Tsc;