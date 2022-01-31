import { Router } from "express";
import { getMessageSample, } from "../controller/message.controller";
var route = Router();
route.get('/messageSample', getMessageSample);
export default route;
