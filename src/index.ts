import { Request, Response, Router } from "express";
import { promises as fs } from "fs";

const router: Router = Router();

type TUser = {
  name: string;
  todos: string[];
};

let userArr: TUser[] = [];
let message: string

router.post("/add", async (req: Request, res: Response) => {
  let name: string = req.body.name
  let todo: string = req.body.todo
 

  
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


//  Fetch users and their todos based on their name
router.get("/todos/:id", async (req: Request, res: Response) => {
  const { id }   = req.params;
  console.log('id', req.params)

  try {
    const data = await fs.readFile("data/todo.json", "utf8");
    const userArr: TUser[] = JSON.parse(data);
    
   
    const user: TUser | undefined  = userArr.find((u) => u.name === id);
    console.log('tyep of user: ', typeof user)

    if (typeof user === "undefined") {
      message = `User with name ${id} not found.`
      res.json({message: message, data: ''})
    } else {
      message = 'User found'
      res.json({message: message, data: user});
    }
  } catch (err: any) {
    console.error("Error fetching user:", err);
  }
});
// End Fetch users

export default router;
