import User from '../models/User.js';
import passport from 'passport';
import {Strategy, ExtractJwt} from 'passport-jwt';


export default passport.use(
    new Strategy(
    {
         jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
         secretOrKey: process.env.SECRET,
    }, 
    async (jwtPayload, done) => {
        try {
 
            let user = await User.findOne({email: jwtPayload.email, online: true})
            
            if(user){
                return done(null, user);
            }else{
                return done(null, null);
            }

        } catch (error) {
            return done(error, false);
            
        }
})
)
