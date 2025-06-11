import express from "express";
import configData from "./configs/config";
import bodyParser from "body-parser";
import cors from "cors";
import router from "./routes";
import { dataSource } from "./configs/db";

dataSource
  .initialize()
  .then(() => {
    console.log("DB Connected and Initialized");
    const app = express();
    app.use(express.json());
    app.use(
      bodyParser.urlencoded({
        extended: true,
      })
    );
    app.use(bodyParser.json());
    app.use(cors());
    app.use(router);

    const port = configData.port || 5001; // Ensure a valid port number is being used
    app.listen(port, () => {
      console.log(`coffee-user-svc started on port :: ${port}`);
    });
  })
  .catch((err) => {
    console.error("Error Initializing DB", err);
  });
