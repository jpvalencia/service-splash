import jwt from "jwt-simple";
import moment from "moment";
import config from "../config/environment";

const authenticate = (req, res, next) => {
  if (!req.headers.authorization) {
    return res
      .status(403)
      .send();
  }
  const token = req.headers.authorization.split(" ")[1];
  let payload;
  try {
     payload = jwt.decode(token, config.TOKEN_SECRET);
  }
  catch(e) {
    return res.status(401).send();
    next();
  }

  if (payload.exp <= moment().unix()) {
    return res.status(401).send({ message: "El token ha expirado" });
    next();
  }

  req.user = payload.sub;
  next();
};

export default { authenticate };
