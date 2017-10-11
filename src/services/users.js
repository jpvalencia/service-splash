import pool from './pool';
import env from '../config/environment';
import {isArray} from 'lodash';
import logger from '../core/logger';
import {sha3_512} from 'js-sha3';

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

        if ( isArray(rows) && rows.length > 0) {
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

exports.default = { exist_email: exist_email, save_email: save_email };
module.exports = exports["default"];