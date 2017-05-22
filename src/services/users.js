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
      let query = `SELECT email, nombre, apellido FROM hipopo.usuarios WHERE email = ? AND password = ? AND status = "ACTIVADO"`;

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

const activate = (email, password, token) => {
  return new Promise((resolve, reject) => {
      let query = `UPDATE hipopo.usuarios set status = 'ACTIVADO', password = ?, activacion_dt = now() WHERE email = ? AND activacion_hash = ? `;

      pool.getConnection(function(err, connection) {
        if (err) {
          logger.log("error", "error in mysql: " + err.stack);
          return resolve(false);
        };
        connection.query(query, [sha3_512(password), email, token], function(err, rows) {
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
      let query = `SELECT email FROM hipopo.usuarios WHERE email = ? and activacion_hash = ? and status = 'DESACTIVADO'`;

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
