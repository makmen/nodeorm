var Store = require('openrecord/store/mysql');

class Workout extends Store.BaseModel{
    static definition(){
        // this is the `definition scope`
        this.validatesPresenceOf('title', 'number', 'company')
    }

    fullName(){
        return this.title + ' ' + this.number + ' ' + this.company
    }
}


module.exports = Workout;