import mongodb from "mongodb";
import env from "../config/environment";
import {isArray} from "lodash";
const MongoClient = mongodb.MongoClient;
import logger from '../core/logger';

const url =
  "mongodb://" +
  env.DB_USER +
  ":" +
  env.DB_PASSWORD +
  "@ds117821.mlab.com:17821/users";
const exist = (username, password) => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, function(e, db) {
      if (e) {
        logger.log('error', "Error en conexion a la base de datos", e);
        reject();
        return;
      }
      db
        .collection("users")
        .find({ username, password })
        .toArray((e, result) => {
          if (isArray(result) && result.length > 0) {
            db.close();
            resolve(true);
          } else {
            db.close();
            resolve(false);
            return;
          }
        });
    });
  });
};

const save = data => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, function(e, db) {
      if (e) {
        logger.log('error', "Error en conexion a la base de datos", e);
        reject();
      }
      db
        .collection("users")
        .insertMany(
          [data],
          (e, result) => {
            if (e) {
              logger.log('error', "Error insertando el usuario", e);
              db.close();
              reject();
            }
            resolve();
          }
        );
    });
  });
};
const get = (email, password) => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, function(e, db) {
      if (e) {
        logger.log('error', "Error en conexion a la base de datos", e);
        reject();
      }
      db
        .collection("users")
        .find({ email, password })
        .toArray((e, result) => {
          if (e) {
            logger.log('error', "Error obteniendo el usuario", e);
            db.close();
            reject();
          }
          if (isArray(result) && result.length > 0) {
            db.close();
            resolve(result);
          } else {
            db.close();
            resolve();
          }
        });
    });
  });
};

const activate = data => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, function(e, db) {
      if (e) {
        logger.log('error', "Error en conexion a la base de datos", e);
        reject();
      }
      db
        .collection("users")
        .insertMany(
          [data],
          (e, result) => {
            if (e) {
              logger.log('error', "Error insertando el usuario", e);
              db.close();
              reject();
            }
            resolve();
          }
        );
    });
  });
};
export default { exist, save, get };
