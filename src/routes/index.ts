import { Router } from "express";
import authRoutes from "./auth"

const rootRoter: Router = Router();

rootRoter.use('/auth', authRoutes);


export default rootRoter;