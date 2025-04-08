import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import colors from 'colors';
import route from './routes/route.js'
import mysqlPool from "./config/db.js";
import errorHandler from "./middlewares/middleware.js";

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());


app.use("/api/v1", route);


const PORT = process.env.port || 8080;

app.use(errorHandler);

mysqlPool
.query("SELECT 1")
.then(() => {
  console.log("Connected to DB!!!!".bgCyan.white);

  app.listen(PORT , () => {
    console.log(`Server is running on ${PORT}!!!!`.yellow);
  });
})
.catch((error) => {
  console.log(error)
});