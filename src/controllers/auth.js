import {omit} from 'lodash';
import token from "../domain/token";
import user from "../domain/user";
import logger from "../core/logger";

var signup = function signup(req, res, next) {
  if (!req.body.email || !req.body.password) {
    return res.status(422).send();
    next();
  }
  var email = req.body.email.toLowerCase();
  var password = req.body.password;
  var start = process.hrtime();
  user.exist(email, password).then(function (exist) {
    var end = process.hrtime(start);
    logger.log("info", "EXIST-USER-TIME", end[0] + "." + end[1]);
    start = process.hrtime();
    if (!exist) {
      user.save(email, password).then(function () {
        end = process.hrtime(start);
        logger.log("info", "SAVE-USER-TIME", end[0] + "." + end[1]);
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

var login = function login(req, res, next) {
  if (!req.body.email || !req.body.password) {
    return res.status(422).send();
    next();
  }
  var email = req.body.email.toLowerCase();
  var password = req.body.password;
  var start = process.hrtime();
  user.get(email, password).then(function (user) {
    var end = process.hrtime(start);
    logger.log("info", "GET-USER-TIME", end[0] + "." + end[1]);
    if (user) {
      var cleanUser = omit(user, ['id']);
      return res.status(200).send({ user: cleanUser, token: token.generate(user) });
    } else {
      return res.status(401).send();
    }
    next();
  }).catch(function (e) {
    return res.status(401).send();
    next();
  });
};

var activate = function activate(req, res, next) {
  if (!req.body.email || !req.body.password || !req.body.token) {
    return res.status(422).send();
    next();
  }
  var email = req.body.email.toLowerCase();
  var password = req.body.password;
  var token = req.body.token;
  var start = process.hrtime();
  user.activate(email, password, token).then(function (user) {
    var end = process.hrtime(start);
    logger.log("info", "ACTIVATE-USER-TIME", end[0] + "." + end[1]);
    if (user) {
      logger.log("info", email + " ACTIVADO");
      return res.status(200).send();
    } else {
      logger.log("error", email + " NO ACTIVADO");
      return res.status(401).send();
    }
    next();
  }).catch(function (e) {
    logger.log("error", "ERROR ACTIVANDO AL USUARIO " + email, e);
    return res.status(401).send();
    next();
  });
};

var validateTokenActivateAccount = function validateTokenActivateAccount(req, res, next) {
  if (!req.query.email || !req.query.token) {
    return res.status(422).send();
    next();
  }
  var email = req.query.email;
  var token = req.query.token;
  var start = process.hrtime();
  user.validateTokenActivateAccount(email, token).then(function (active) {
    var end = process.hrtime(start);
    logger.log("info", "VALIDATE-TOKEN-ACTIVATE-ACCOUNT", end[0] + "." + end[1]);
    if (active) {
      return res.status(200).send();
    } else {
      return res.status(401).send();
    }
    next();
  }).catch(function (e) {
    return res.status(401).send();
    next();
  });
};

exports.default = { signup: signup, subscribe: subscribe, login: login, activate: activate, validateTokenActivateAccount: validateTokenActivateAccount };
module.exports = exports["default"];