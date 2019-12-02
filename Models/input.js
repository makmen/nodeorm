var Store = require('openrecord/store/mysql');

class Input extends Store.BaseModel{
    static definition(){
        // this is the `definition scope`
        this.validatesPresenceOf('title', 'type', 'company', 'ip')
    }

    // fullName(){
    //     return this.title + ' ' + this.description
    // }
}

module.exports = Input;