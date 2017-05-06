import token from "../domain/token";
import user from "../domain/user";
import logger from "../core/logger";

const signup = (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    return res.status(422).send();
    next();
  }
  const email = req.body.email.toLowerCase();
  const password = req.body.password;
  let start = process.hrtime();
  user
    .exist(email, password)
    .then(exist => {
      let end = process.hrtime(start);
      logger.log("info", "EXIST-USER-TIME", `${end[0]}.${end[1]}`);
      start = process.hrtime();
      if (!exist) {
        user
          .save( email, password )
          .then(() => {
            end = process.hrtime(start);
            logger.log("info", "SAVE-USER-TIME", `${end[0]}.${end[1]}`);
            return res.status(200).send();
            next();
          })
          .catch(e => {
            logger.log("error", "Error guardando el usuario", e);
            return res.status(500).send();
            next();
          });
      } else {
        logger.log("error", "Ya existe el usuario");
        return res.status(409).send();
        next();
      }
    })
    .catch(error => {
      logger.log("error", "Error guardando el usuario", e);
      return res.status(500).send();
      next();
    });
};

const login = (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    return res.status(422).send();
    next();
  }
  const email = req.body.email.toLowerCase();
  const password = req.body.password;
  const start = process.hrtime();
  user.get( email, password )
  .then((user)=> {
    const end = process.hrtime(start);
    logger.log("info", "GET-USER-TIME", `${end[0]}.${end[1]}`);
    if(user) {
      return res.status(200).send({ token: token.generate(user) });
    }
    else {
      return res.status(401).send();
    }
    next();
  })
  .catch((e) => {
    return res.status(401).send();
    next();
  });
};

const activate = (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    return res.status(422).send();
    next();
  }
  const email = req.body.email.toLowerCase();
  const password = req.body.password;
  const start = process.hrtime();
  user.activate( email, password )
  .then((user)=> {
    const end = process.hrtime(start);
    logger.log("info", "ACTIVATE-USER-TIME", `${end[0]}.${end[1]}`);
    if(user) {
      return res.status(200).send({ token: token.generate(user) });
    }
    else {
      return res.status(401).send();
    }
    next();
  })
  .catch((e) => {
    return res.status(401).send();
    next();
  });
};


export default { signup, login, activate };
