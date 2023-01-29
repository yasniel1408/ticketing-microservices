import express from "express";
import "express-async-errors"; // esto resuelve el problea de lanzar errores en funciones con async
import cookieSession from "cookie-session";

const server = express();
server.set("trust proxy", true); // esto es para que podamos ingresar y confiar en el proxy
server.use(express.json());
server.use(
  cookieSession({
    signed: false, // esto es para desactivar el encriptado de las cookies
    secure: false, // seguridad - solo se puede ingresar por https, en local lo ponemos en false de momento
  })
);

export { server };
