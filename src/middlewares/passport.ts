import { User } from "../entity/User";
import { Strategy, ExtractJwt, StrategyOptions } from "passport-jwt";


const opts: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'somesecrettoken'
};

export default new Strategy(opts, async (payload, done) => {
  try {
    const user = await User.findOneBy({ id: parseInt(payload.id) });

    if (user) {
      return done(null, user);
    }
    return done(null, false);
    
  } catch (error) {
    console.log(error);
  }
});

