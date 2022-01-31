import { init as initDatas } from "./datas/index.data";
import bodyParser from "body-parser";
import cors from "cors";
import environment from "./environment";
import express from "express";
import userRoute from "./routes/user.route";
import messageRoute from "./routes/message.route";
initDatas();
var app = express();
var corsOptions = {
    origin: environment.clientURL
};
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', function (req, res) {
    res.status(200).send('Welcom to my Solana API.');
});
app.use(messageRoute);
app.use("/user", userRoute);
export default app;
