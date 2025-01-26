import express, { Express, Request, Response } from "express";
import { PORT } from './secrets'
import rootRoter from "./routes";
import { PrismaClient } from "@prisma/client";


const app:Express = express();

app.use(express.json())

export const prismaClient = new PrismaClient({
    log:['query']
})

app.use('/api', rootRoter);

app.listen(PORT, () => {`Server is running on PORT ${PORT}`});
