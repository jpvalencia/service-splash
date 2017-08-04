import express from "express";
import bodyParser from "body-parser";
import auth from "./controllers/auth";
import middAuth from "./middlewares/authenticate";
import logger from './core/logger';
import cors from "cors";

// Configuramos Express
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({origin:true,credentials: true}));
app.set("port", 3001);

// Rutas de autenticación y login
app.post("/auth/signup", auth.signup);
app.post("/auth/login", auth.login);
app.get("/auth/validate", middAuth.authenticate, (req, res, next) => {
  logger.log('info', "AUTHENTICATE");
  return res.status(200).send();
  next();
});

app.get("/auth/validate-token-activate-account", auth.validateTokenActivateAccount);

app.post("/auth/activate", auth.activate);


app.listen(app.get('port'), () => {
    logger.log('info', 'Auth service corriendo en '+ app.get('port'));
});
