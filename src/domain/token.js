import jwt from "jwt-simple";
import moment from "moment";
import config from "../config/environment";

const generate = user => {
  var payload = {
    sub: user.email,
    iat: moment().unix(),
    exp: moment().add(15, "day").unix()
  };
  return jwt.encode(payload, config.TOKEN_SECRET);
};

export default { generate };
