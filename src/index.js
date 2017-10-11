import express from "express";
import bodyParser from "body-parser";
import auth from "./controllers/auth";
import logger from './core/logger';
import cors from "cors";

// Configuramos Express
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({origin:true,credentials: true}));
app.set("port", 3001);

// Rutas de autenticación y login
app.post("/auth/subscribe", auth.subscribe);

app.listen(app.get('port'), () => {
    logger.log('info', 'Auth service corriendo en '+ app.get('port'));
});
