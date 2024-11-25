"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fs_1 = require("fs");
const router = (0, express_1.Router)();
let userArr = [];
let message;
router.post("/add", async (req, res) => {
    let name = req.body.name;
    let todo = req.body.todo;
    try {
        const todoData = await fs_1.promises.readFile("data/todo.json", "utf8");
        userArr = JSON.parse(todoData);
    }
    catch (err) {
        message = 'Error';
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
    await fs_1.promises.writeFile("data/todo.json", JSON.stringify(updatedUsers, null, 2), "utf8");
    message = `Todo added successfully for user ${name}.`;
    res.json({ message: message });
}); // End add()
//  Fetch users and their todos based on their name
router.get("/todos/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const data = await fs_1.promises.readFile("data/todo.json", "utf8");
        const userArr = JSON.parse(data);
        const user = userArr.find((u) => u.name === id);
        console.log('tyep of user: ', typeof user);
        if (typeof user === "undefined") {
            message = `User with name ${id} not found.`;
            res.json({ message: message, data: '' });
        }
        else {
            message = 'User found';
            res.json({ message: message, data: user });
        }
    }
    catch (err) {
        console.error("Error fetching user:", err);
    }
});
// End Fetch users
// Delete route
router.delete("/delete", async (req, res) => {
    let name = req.body.name;
    try {
        const data = await fs_1.promises.readFile("data/todo.json", "utf8");
        let userArr = JSON.parse(data);
        userArr = userArr.filter((u) => u.name !== name);
        await fs_1.promises.writeFile("data/todo.json", JSON.stringify(userArr, null, 2));
        res.json({ message: "User deleted successfully." });
    }
    catch (err) {
        console.error("Error deleting user:", err);
    }
});
exports.default = router;
