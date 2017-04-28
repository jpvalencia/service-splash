import express from "express";
import bodyParser from "body-parser";
import auth from "./controllers/auth";
import middAuth from "./middlewares/authenticate";
import logger from './core/logger';

import {each} from 'lodash';

// Configuramos Express
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("port", 3000);

// Rutas de autenticación y login
app.post("/auth/signup", auth.signup);
app.post("/auth/login", auth.login);

// Ruta solo accesible si estás autenticado
app.get("/private", middAuth.authenticate, (req, res) => {
  console.log("AUTENTICADO");
});


app.listen(app.get('port'), () => {
    logger.log('info', 'Auth service corriendo en '+ app.get('port'));
});
