import jwt from 'jwt-simple';
import moment from 'moment';
import config from '../config/environment';

const authenticate = (req, res, next) => {
  if (!req.headers.authorization) {
    return res
      .status(403)
      .send({ message: 'Tu petición no tiene cabecera de autorización' });
  }

  const token = req.headers.authorization.split(' ')[1];
  const payload = jwt.decode(token, config.TOKEN_SECRET);

  if (payload.exp <= moment().unix()) {
    return res.status(401).send({ message: 'El token ha expirado' });
  }

  req.user = payload.sub;
  next();
};

export default { authenticate };
