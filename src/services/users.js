import pool from './pool';
import env from '../config/environment';
import {isArray} from 'lodash';
import logger from '../core/logger';
import {sha3_512} from 'js-sha3';

var exist = function exist(email, user_password) {
  return new Promise(function (resolve, reject) {
    var query = "SELECT * FROM hipopo.users WHERE email = ? AND user_password = ?";

    pool.getConnection(function (err, connection) {
      if (err) {
        logger.log("error", "error in mysql: " + err.stack);
        return resolve(false);
      };
      connection.query(query, [email, (0, _jsSha.sha3_512)(user_password)], function (err, rows) {
        connection.release();
        if (err) {
          logger.log("error", "error in mysql: " + err.stack);
          resolve(false);
          return;
        }

        if ((0, _lodash.isArray)(rows) && rows.length > 0) {
          resolve(true);
          return;
        } else {
          resolve(false);
          return;
        }
      });
    });
  });
};

var exist_email = function exist_email(email) {
  return new Promise(function (resolve, reject) {
    var query = "SELECT * FROM hipopo.users_splash WHERE email = ?";

    pool.getConnection(function (err, connection) {
      if (err) {
        logger.log("error", "error in mysql: " + err.stack);
        return resolve(false);
      };
      connection.query(query, email, function (err, rows) {
        connection.release();
        if (err) {
          logger.log("error", "error in mysql: " + err.stack);
          resolve(false);
          return;
        }

        if ((0, _lodash.isArray)(rows) && rows.length > 0) {
          resolve(true);
          return;
        } else {
          resolve(false);
          return;
        }
      });
    });
  });
};

var save = function save(email, user_password) {
  return new Promise(function (resolve, reject) {
    var query = "INSERT INTO hipopo.users (id, email, user_password, user_status) VALUES('', ?,?, 'DESACTIVADO')";

    pool.getConnection(function (err, connection) {
      if (err) {
        logger.log("error", "error in mysql: " + err.stack);
        return resolve(false);
      };
      connection.query(query, [email, (0, _jsSha.sha3_512)(user_password)], function (err, rows) {
        connection.release();
        if (err) {
          logger.log("error", "error in mysql: " + err.stack);
          resolve(false);
          return;
        } else {
          resolve(true);
          return;
        }
      });
    });
  });
};

var save_email = function save_email(email) {
  return new Promise(function (resolve, reject) {
    var query = "INSERT INTO hipopo.users_splash (email) VALUES(?)";

    pool.getConnection(function (err, connection) {
      if (err) {
        logger.log("error", "error in mysql: " + err.stack);
        return resolve(false);
      };
      connection.query(query, email, function (err, rows) {
        connection.release();
        if (err) {
          logger.log("error", "error in mysql: " + err.stack);
          resolve(false);
          return;
        } else {
          resolve(true);
          return;
        }
      });
    });
  });
};

var get = function get(email, user_password) {
  return new Promise(function (resolve, reject) {
    var query = "SELECT customer_id, email, user_name, user_last_name FROM hipopo.users WHERE email = ? AND user_password = ? AND user_status = \"ACTIVADO\"";

    pool.getConnection(function (err, connection) {
      if (err) {
        logger.log("error", "error in mysql: " + err.stack);
        return resolve(false);
      };
      connection.query(query, [email, (0, _jsSha.sha3_512)(user_password)], function (err, rows) {
        connection.release();
        if (err) {
          logger.log("error", "error in mysql: " + err.stack);
          resolve(false);
          return;
        }
        if ((0, _lodash.isArray)(rows) && rows.length > 0) {
          resolve(rows[0]);
          return;
        } else {
          resolve(false);
          return;
        }
      });
    });
  });
};

var activate = function activate(email, user_password, token) {
  return new Promise(function (resolve, reject) {
    var query = "UPDATE hipopo.users set user_status = 'ACTIVADO', user_password = ?, activacion_dt = now() WHERE email = ? AND activacion_hash = ? ";

    pool.getConnection(function (err, connection) {
      if (err) {
        logger.log("error", "error in mysql: " + err.stack);
        return resolve(false);
      };
      connection.query(query, [(0, _jsSha.sha3_512)(user_password), email, token], function (err, rows) {
        connection.release();
        if (err) {
          logger.log("error", "error in mysql: " + err.stack);
          resolve(false);
          return;
        }

        resolve(true);
        return;
      });
    });
  });
};

var validateTokenActivateAccount = function validateTokenActivateAccount(email, token) {
  return new Promise(function (resolve, reject) {
    var query = "SELECT email FROM hipopo.users WHERE email = ? and activacion_hash = ? and user_status = 'DESACTIVADO'";

    pool.getConnection(function (err, connection) {
      if (err) {
        logger.log("error", "error in mysql: " + err.stack);
        return resolve(false);
      };
      connection.query(query, [email, token], function (err, rows) {
        connection.release();
        if (err) {
          logger.log("error", "error in mysql: " + err.stack);
          resolve(false);
          return;
        }
        if ((0, _lodash.isArray)(rows) && rows.length > 0) {
          resolve(true);
          return;
        } else {
          resolve(false);
          return;
        }
      });
    });
  });
};

exports.default = { exist: exist, exist_email: exist_email, save: save, save_email: save_email, get: get, activate: activate, validateTokenActivateAccount: validateTokenActivateAccount };
module.exports = exports["default"];