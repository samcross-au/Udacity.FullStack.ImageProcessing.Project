import express, { Request, Response, NextFunction } from "express";

import routes from "./routes/index";
import logger from './utilities/logger';

const app = express();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.use("/", logger, routes);

app.use((error: any, request: Request, response: Response, next: NextFunction) => {
  response.send(`<h1 style="text-align: center;color:red;">${error.message}</h1>`);
});

export default app;