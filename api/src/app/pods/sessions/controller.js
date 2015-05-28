import { User } from '../../models/user';
import PasswordService from '../../services/password';
import Boom from 'boom';
import JwtService from '../../services/jwt'

export default {

  token: (req, reply) => {
    // console.log({ email: req.payload.email, password: PasswordService.encrypt(req.payload.password) });
    User
      .filter({ email: req.payload.email, password: PasswordService.encrypt(req.payload.password) })
      .limit(1)
      .run()
      .then((res) => {
        if (res.length === 0){ return reply(Boom.unauthorized('Invalid email or password')); }
        let user = res[0];
        reply({id: user.id, jwt: JwtService.sign(user.jwtAttributes())});
      })
      .catch((e) => {
        reply(Boom.wrap(e, 422));
      });
  }

};