var Store = require('openrecord/store/mysql');

class User extends Store.BaseModel{
    static definition(){
        // this is the `definition scope`
        this.validatesPresenceOf('login', 'email', 'password')
    }

    toJwtObject() {
        return {
            id: this.id,
            login: this.login,
            password: this.password,
            email: this.email
        }
    }
}

module.exports = User;