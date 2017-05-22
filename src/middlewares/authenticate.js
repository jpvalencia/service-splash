import jwt from "jwt-simple";
import moment from "moment";
import config from "../config/environment";

const authenticate = (req, res, next) => {
  if (!req.headers.authorization) {
    console.log("No existe header de autorizacion")
    return res
      .status(403)
      .send();
      next()
  }
  const token = req.headers.authorization.split(" ")[1];
  let payload;
  try {
     payload = jwt.decode(token, config.TOKEN_SECRET);
  }
  catch(e) {
    console.log("Error desencriptando el token", e);
    return res.status(401).send();
    next();
  }

  if (payload.exp <= moment().unix()) {
    console.log("el token ha expirado");
    return res.status(401).send({ message: "El token ha expirado" });
    next();
  }
  console.log("Token validado")
  req.user = payload.sub;
  next();
};

export default { authenticate };
