import type { Request, Response } from "express";
import db from "../db/index.js"
export default async function auth(req: Request, res: Response, next: any){
    const username = req.header("X-username");
    if(!username){
         return res.status(401).send({
            error: true,
            message: "Unauthorized"
        })
    }
     const existingUser = await db.oneOrNone(
        "SELECT * FROM users WHERE name = $1",
        [username]
     )
     if(!existingUser){
        return res.status(401).send({
            error: true,
            message: "Unauthorized"
        })
     }
    req.user = existingUser;
    next();
}