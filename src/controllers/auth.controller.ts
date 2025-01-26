import { Request, Response } from "express"
import {hashSync , compareSync} from "bcrypt"
// import * as jwt from "jsonwebtoken"
import jwt from "jsonwebtoken"
import { prismaClient } from "..";
import { JWT_SECRATE } from "../secrets";

export const signup = async (req: Request, res: Response) => {
    const { email, password, name } = req.body;
  
    try {
      let user = await prismaClient.user.findFirst({ where: { email } });
  
      if (user) {
         res.status(409).json({ message: 'User already exists!' });
      }

      const hashedPassword = hashSync(password, 10);

      user = await prismaClient.user.create({
        data: {
          name,
          email,
          password: hashedPassword
        }
      });
  
       res.status(201).json({
        message: 'User created successfully',
        user: { id: user.id, name: user.name, email: user.email }
      });
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

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