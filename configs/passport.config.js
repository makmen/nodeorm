const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
var User = require('../Models/user');

module.exports = function (passport) {
    var opts = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'),
      secretOrKey: 'secret-word'
    };

    passport.use(new JwtStrategy(opts, async function (jwt_payload, done) {
        console.log(jwt_payload)
        let user = await User.find(jwt_payload.id);
        console.log(user)
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        }
    }));
};