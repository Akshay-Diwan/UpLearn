import express from "express"
import type { Request, Response }  from "express"
import db from "../db/index.js";
import type { SignUpDTO } from "../types/dto.ts";
const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
   const body: SignUpDTO = req.body;
   console.log("Body : ", body);
   const existingUser = await db.oneOrNone(
    "SELECT * FROM users WHERE name=$1",
    [body.name]
    );
    console.log("existing users : ")
    console.log(existingUser);
    if(existingUser){
        return res.status(409).send({
            error: true,
            message: "user with same name exists"
        });
    }
    const createdUser = await db.one(
        `INSERT INTO users(name, age, class)
        VALUES($1, $2, $3)
            RETURNING *`,
    [body.name, body.age, body.class]
    )
    return res.send({
        message: "User created Successfully",
        name: createdUser.name
    })
})

export default router