"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const index_1 = __importDefault(require("./src/index"));
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
app.use("/", index_1.default);
app.use(express_1.default.static(path_1.default.join(__dirname, "../public")));
