import { Request, Response, Router } from "express";
import { promises as fs } from "fs";

const router: Router = Router();

type TUser = {
  name: string;
  todos: string[];
};

let userArr: TUser[] = [];

router.post("/add", async (req: Request, res: Response) => {
  let name: string = req.body.name
  let todo: string = req.body.todo
  let message: string

  
    try {
      const todoData = await fs.readFile("data/todo.json", "utf8");
      
      userArr = JSON.parse(todoData);
      
      
    } catch (err) {
      
      message = 'Error'
    }

    const updatedUsers = [...userArr];
    let userFound = false;
    
    for (let i = 0; i < updatedUsers.length; i++) {
      if (updatedUsers[i].name === name) {
        userFound = true;
        updatedUsers[i] = {
          ...updatedUsers[i],
          todos: [...updatedUsers[i].todos, todo],
        };
        break;
      }
    }
    
    if (!userFound) {
      updatedUsers.push({ name, todos: [todo] });
    }
    
    await fs.writeFile("data/todo.json", JSON.stringify(updatedUsers, null, 2), "utf8"); 
    message = `Todo added successfully for user ${name}.`
    res.json({message: message})
  
}); // End add()


export default router;
