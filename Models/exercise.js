var Store = require('openrecord/store/mysql');

class Exercise extends Store.BaseModel{
    static definition(){
        // this is the `definition scope`
        this.validatesPresenceOf('title', 'description')
    }

    fullName(){
        return this.title + ' ' + this.description
    }
}

module.exports = Exercise;