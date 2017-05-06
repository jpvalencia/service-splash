import pool from './pool';
import env from "../config/environment";
import {isArray} from "lodash";
import logger from '../core/logger';
import { sha3_512 } from 'js-sha3';
const exist = (email, password) => {
  return new Promise((resolve, reject) => {
      let query = `SELECT * FROM hipopo.usuarios WHERE email = ? AND password = ?`;

      pool.getConnection(function(err, connection) {
        if (err) {
          logger.log("error", "error in mysql: " + err.stack);
          return resolve(false);
        };
        connection.query(query, [email, sha3_512(password)], function(err, rows) {
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

const save = (email, password) => {
  return new Promise((resolve, reject) => {
      let query = `INSERT INTO hipopo.usuarios (id, email, password, status) VALUES('', ?,?, 'DESACTIVADO')`;

      pool.getConnection(function(err, connection) {
        if (err) {
          logger.log("error", "error in mysql: " + err.stack);
          return resolve(false);
        };
        connection.query(query, [email, sha3_512(password)], function(err, rows) {
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
const get = (email, password) => {
  return new Promise((resolve, reject) => {
      let query = `SELECT * FROM hipopo.usuarios WHERE email = ? AND password = ?`;

      pool.getConnection(function(err, connection) {
        if (err) {
          logger.log("error", "error in mysql: " + err.stack);
          return resolve(false);
        };
        connection.query(query, [email, sha3_512(password)], function(err, rows) {
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
            resolve(rows);
            return;
          }

        });
      });
    });
};

const activate = (email, password) => {
  return new Promise((resolve, reject) => {
      let query = `UPDATE hipopo.usuarios set status = 'ACTIVADO' WHERE email = ? AND password = ? `;

      pool.getConnection(function(err, connection) {
        if (err) {
          logger.log("error", "error in mysql: " + err.stack);
          return resolve(false);
        };
        connection.query(query, [email, sha3_512(password)], function(err, rows) {
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
export default { exist, save, get, activate };
