import express from "express";

export default abstract class RouteControllerBase {
  constructor(public app: express.Application,public name: string,public path: string) {
    this.configureRoutes();
  }

  abstract configureRoutes(): express.Application;
}
