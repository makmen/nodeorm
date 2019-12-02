var Store = require('openrecord/store/mysql');

class Uniq extends Store.BaseModel{
    static definition(){
        // this is the `definition scope`
        this.validatesPresenceOf('T', 'S', 'C')
    }

}

module.exports = Uniq;