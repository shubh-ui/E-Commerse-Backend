import dotenv from 'dotenv';

dotenv.config({path:'.env'});

export const PORT = process.env.PORT;
export const JWT_SECRATE = process.env.JWT_SECRATE!;