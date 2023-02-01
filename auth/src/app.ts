import express from "express";
import "express-async-errors"; // esto resuelve el problea de lanzar errores en funciones con async
import cookieSession from "cookie-session";
import cors from "cors";
import helmet from "helmet";
import RouteControllerBase from "@app/common/route-controller-base";
import {
  CurrentUserRouteController,
  SignInRouteController,
  SignOutRouteController,
  SignUpRouteController,
} from "@app/auth/api";
import { NotFoundError } from "@app/common/errors";
import { ErrorHandlerMiddleware } from "@app/common/middlewares";

const whitelist = ["*", "[::1]:8080", "127.0.0.1:80"];
const corsOptions = {
  origin: (origin: any, callback: any) => {
    if (whitelist.includes(origin) || whitelist.includes("*")) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

const app = express();
app.set("trust proxy", true); // esto es para que podamos ingresar y confiar en el proxy

// Middlewares
app.use(ErrorHandlerMiddleware.handler);
app.use(express.json());
app.use(cors(corsOptions));
app.use(helmet());
app.use(
  cookieSession({
    signed: false, // esto es para desactivar el encriptado de las cookies
    secure: false, // seguridad - solo se puede ingresar por https, en local lo ponemos en false de momento
  })
);

const routes: Array<RouteControllerBase> = [];

// Routes
routes.push(new SignUpRouteController(app));
routes.push(new SignInRouteController(app));
routes.push(new CurrentUserRouteController(app));
routes.push(new SignOutRouteController(app));
app.all("*", async () => {
  throw new NotFoundError();
});

export { app, routes };
