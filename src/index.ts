import { Request, Response, Router } from "express";

const router: Router = Router()

type TUser = {
    name: string,
    email: string
}
let myUser: Array<TUser> = []
let totalUserCount: number = 0

router.post('/users', (req: Request, res: Response)=>{
    let userCount: number = 0
    userCount = myUser.push(req.body)
    res.json({message: "User successfully added"})
})

router.get('/users', (req: Request, res: Response)=>{
    res.json({status: 201, users: myUser})
})

router.post('/sum', (req: Request, res: Response)=>{
    let numbersArr: number[] = req.body.numbers
    let sum: number = 0
    numbersArr.forEach((element) =>
        sum = sum + element
   )
    res.json({'sum': sum})
})

export default router