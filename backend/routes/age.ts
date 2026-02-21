import express from "express"
import type { Request, Response }  from "express"
import db from "../db/index.js";
const router = express.Router();


router.get('/', async (req: Request, res: Response) => {
    return res.send({
        age: req.user.age
    });
});

export default router;
