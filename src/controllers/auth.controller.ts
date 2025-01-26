import { Request, Response } from "express"
import {hashSync , compareSync} from "bcrypt"
// import * as jwt from "jsonwebtoken"
import jwt from "jsonwebtoken"
import { prismaClient } from "..";
import { JWT_SECRATE } from "../secrets";

export const signup = async (req: Request, res: Response) => {
    const { email, password, name } = req.body;

    let user = await prismaClient.user.findFirst({ where: { email } });

    if(user) {
        throw Error("User already exist!");
    }

    user = await prismaClient.user.create({
        data : {
            name,
            email,
            password: hashSync(password, 10)
        }
    })

    res.status(200).send(user);

}

export const login = async (req : Request, res: Response) => {
    const { email, password } = req.body;

    let user = await prismaClient.user.findFirst({
        where: {
            email
        }
    })

    if(!user) {
        throw Error("User does not found.");
    }

    if(!compareSync(password, user.password)) {
        throw Error("Invalid Credintials");
    }

    const token = jwt.sign({
        userId: user.id
    },JWT_SECRATE)

    res.json({user, token})
}