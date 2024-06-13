import express from "express";
import Router from "./src/routes/products.route.js";
import MongoConnection from "./src/models/MongoConnection.js"

const app = express();
const PORT = 8080;

app.use(express.json()); //traer info del req.body
app.use(express.urlencoded({ extended: true })); //req.params

app.use("/", new Router().start());

await MongoConnection.connect()

app.listen(PORT, () => console.log(`Server listening on: ${PORT}`));
app.on("error", (error) => console.log(`ERROR: ${error}`));
