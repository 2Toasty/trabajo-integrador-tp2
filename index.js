import express from "express";
import HeroesRouter from "./src/routes/heroes.route.js";
import UsersRouter from "./src/routes/users.route.js";
import MongoConnection from "./src/models/MongoConnection.js"

const app = express();
const PORT = 8080;

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

await MongoConnection.connect()

app.use('/api/users', new UsersRouter().start());
app.use('/api/heroes', new HeroesRouter().start());




app.listen(PORT, () => console.log(`Server listening on: ${PORT}`));
app.on("error", (error) => console.log(`ERROR: ${error}`));
