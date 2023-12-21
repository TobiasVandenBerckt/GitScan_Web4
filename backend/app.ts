import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import * as bodyParser from "body-parser";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import userRouter from "./controller/user.routes";
import filmRouter from "./controller/film.routes";
import regisseurRouter from "./controller/regisseur.routes";
import actorRouter from "./controller/actor.routes";
import { expressjwt } from 'express-jwt';
import { Request, Response, NextFunction } from 'express';


const app = express();
dotenv.config();
const port = process.env.APP_PORT || 3000;

const swaggerOpts = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Back-end",
      version: "1.0.0",
    },
    components: {
      securitySchemes: {
      bearerAuth: {
      type: "http",
      scheme: "bearer",
      bearerFormat: "JWT",
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
  },
  apis: ["./controller/*.routes.ts"],
};
const swaggerSpec = swaggerJSDoc(swaggerOpts);

app.use(
  expressjwt({ secret: process.env.JWT_SECRET, algorithms:
 ["HS256"] }).unless({
  path: [/^\/api-docs(\/.*)?$/, '/user/login', '/user/add', '/status'],
  })
 );
app.use(cors());
app.use(bodyParser.json());

app.get("/status", (req, res) => {
  res.json({ message: "Back-end is running..." });
});
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get("/user/:id", userRouter);
app.get("/user/email/:email", userRouter);
app.get("/users", userRouter);
app.get("/director/:id", regisseurRouter);
app.post("/user/add", userRouter);
app.post("/user/login", userRouter);
app.put("/user/update", userRouter);
app.delete("/user/delete/:id", userRouter);
app.get("/directors", regisseurRouter);
app.put("/director/update/:id", regisseurRouter);
app.delete("/director/delete/:id", regisseurRouter);
app.post("/director/add", regisseurRouter);
app.post("/movie/add", filmRouter);
app.get("/movies", filmRouter);
app.get("/movie/:id", filmRouter);
app.get("/actors", actorRouter);
app.get("/actor/:id", actorRouter);
app.post("/actor/add", actorRouter);
app.delete("/actor/delete/:id", actorRouter);
app.put("/actor/update/:id", actorRouter);
app.put("/movie/update/:id", filmRouter);
app.delete("/movie/delete/:id", filmRouter);
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error.name === 'UnauthorizedError') {
    res.status(401).json({ status: 'unauthorized', message: error.message });
  } else if (error.name === 'HealthyError') {
    res.status(400).json({ status: 'error', message: error.message});
  } else {
    next();
  }
});

app.listen(port || 3000, () => {
  console.log(`Back-end is running on port ${port}.`);
});


