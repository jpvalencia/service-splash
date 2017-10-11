import {omit} from 'lodash';
import user from "../domain/user";
import logger from "../core/logger";

var subscribe = function subscribe(req, res, next) {
  if (!req.body.email) {
    return res.status(422).send();
    next();
  }
  var email = req.body.email.toLowerCase();
  user.exist_email(email).then(function (exist_email) {
    logger.log("info", "EXIST-USER-TIME");
    if (!exist_email) {
      user.save_email(email).then(function () {
        logger.log("info", "SAVE-USER-TIME");
        return res.status(200).send();
        next();
      }).catch(function (e) {
        logger.log("error", "Error guardando el usuario", e);
        return res.status(500).send();
        next();
      });
    } else {
      logger.log("error", "Ya existe el usuario");
      return res.status(409).send();
      next();
    }
  }).catch(function (error) {
    logger.log("error", "Error guardando el usuario", e);
    return res.status(500).send();
    next();
  });
};

exports.default = { subscribe: subscribe };
module.exports = exports["default"];