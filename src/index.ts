import { Request, Response, Router } from "express";

const router: Router = Router();

type TUser = {
  name: string;
  todos: string[];
};

let userArr: TUser[] = [];

router.post("/add", (req: Request, res: Response) => {
  let name: string = req.body.name
  let todos: string = req.body.todos
  let message: string

  const result  = userArr.find(a => a.name === name)

  if (result) {
    message = ''
 
    userArr.forEach((user: { name: string; todos: string[] }) => {
        if (user.name === name) {
            user.todos.push(todos);
        }
    });
} else {
  try {
    
    userArr.push({ name:name, todos:[todos] });
    
    message = `Todo added successfully for user ${name}.`
    res.json({message: message})
   
  } catch (error) {
    console.log("error ")
  }
 
}
  
});


export default router;
