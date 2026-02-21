import express from "express"
import type { Request, Response }  from "express"
import db from "../db/index.js";
const router = express.Router();


router.post('/', async (req: Request, res: Response) => {
    const body = req.body;
    const existingUser = await db.oneOrNone(
        "SELECT * FROM users WHERE name=$1",
        [body.name]
    )
    if(!existingUser){
        return res.status(404).send({
            error: true,
            message: `no user with name ${body.name} found`
        });
        
    }
    res.send({
        data: existingUser
    })
});

export default router;
