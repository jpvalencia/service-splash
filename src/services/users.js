import pool from './pool';
import env from "../config/environment";
import {isArray} from "lodash";
import logger from '../core/logger';
import { sha3_512 } from 'js-sha3';
const exist = (email, user_password) => {
  return new Promise((resolve, reject) => {
      let query = `SELECT * FROM hipopo.users WHERE email = ? AND user_password = ?`;

      pool.getConnection(function(err, connection) {
        if (err) {
          logger.log("error", "error in mysql: " + err.stack);
          return resolve(false);
        };
        connection.query(query, [email, sha3_512(user_password)], function(err, rows) {
          connection.release();
          if (err) {
            logger.log("error", "error in mysql: " + err.stack);
            resolve(false);
            return;
          }

          if(isArray(rows) && rows.length > 0) {
            resolve(true);
            return;
          }
          else {
            resolve(false);
            return;
          }
        });
      });
    });
};

const save = (email, user_password) => {
  return new Promise((resolve, reject) => {
      let query = `INSERT INTO hipopo.users (id, email, user_password, user_status) VALUES('', ?,?, 'DESACTIVADO')`;

      pool.getConnection(function(err, connection) {
        if (err) {
          logger.log("error", "error in mysql: " + err.stack);
          return resolve(false);
        };
        connection.query(query, [email, sha3_512(user_password)], function(err, rows) {
          connection.release();
          if (err) {
            logger.log("error", "error in mysql: " + err.stack);
            resolve(false);
            return;
          }
          else {
            resolve(true);
            return;
          }
        });
      });
    });
};
const get = (email, user_password) => {
  return new Promise((resolve, reject) => {
      let query = `SELECT customer_id, email, user_name, user_last_name FROM hipopo.users WHERE email = ? AND user_password = ? AND user_status = "ACTIVADO"`;

      pool.getConnection(function(err, connection) {
        if (err) {
          logger.log("error", "error in mysql: " + err.stack);
          return resolve(false);
        };
        connection.query(query, [email, sha3_512(user_password)], function(err, rows) {
          connection.release();
          if (err) {
            logger.log("error", "error in mysql: " + err.stack);
            resolve(false);
            return;
          }
          if(isArray(rows) && rows.length > 0) {
            resolve(rows[0]);
            return;
          }
          else {
            resolve(false);
            return;
          }

        });
      });
    });
};

const activate = (email, user_password, token) => {
  return new Promise((resolve, reject) => {
      let query = `UPDATE hipopo.users set user_status = 'ACTIVADO', user_password = ?, activacion_dt = now() WHERE email = ? AND activacion_hash = ? `;

      pool.getConnection(function(err, connection) {
        if (err) {
          logger.log("error", "error in mysql: " + err.stack);
          return resolve(false);
        };
        connection.query(query, [sha3_512(user_password), email, token], function(err, rows) {
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

const validateTokenActivateAccount = (email, token) => {
  return new Promise((resolve, reject) => {
      let query = `SELECT email FROM hipopo.users WHERE email = ? and activacion_hash = ? and user_status = 'DESACTIVADO'`;

      pool.getConnection(function(err, connection) {
        if (err) {
          logger.log("error", "error in mysql: " + err.stack);
          return resolve(false);
        };
        connection.query(query, [email, token], function(err, rows) {
          connection.release();
          if (err) {
            logger.log("error", "error in mysql: " + err.stack);
            resolve(false);
            return;
          }
          if(isArray(rows) && rows.length > 0) {
            resolve(true);
            return;
          }
          else {
            resolve(false);
            return;
          }

        });
      });
    });
};


export default { exist, save, get, activate, validateTokenActivateAccount };
