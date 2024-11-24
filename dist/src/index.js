"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fs_1 = require("fs");
const router = (0, express_1.Router)();
let userArr = [];
router.post("/add", async (req, res) => {
    let name = req.body.name;
    let todo = req.body.todo;
    let message;
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
exports.default = router;
