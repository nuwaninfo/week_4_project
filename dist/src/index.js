"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
let userArr = [];
router.post("/add", (req, res) => {
    let name = req.body.name;
    let todos = req.body.todos;
    let message;
    const result = userArr.find(a => a.name === name);
    if (result) {
        message = '';
        userArr.forEach((user) => {
            if (user.name === name) {
                user.todos.push(todos);
            }
        });
    }
    else {
        try {
            userArr.push({ name: name, todos: [todos] });
            message = `Todo added successfully for user ${name}.`;
            res.json({ message: message });
        }
        catch (error) {
            console.log("error ");
        }
    }
});
exports.default = router;
