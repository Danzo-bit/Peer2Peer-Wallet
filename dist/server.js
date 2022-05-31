"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();
//create an express server
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/payment-system", require("./src/controller"));
app.use("*", (req, res) => {
    res.status(404).json({
        success: "false",
        message: "There is no explicit mapping for this resource",
        error: {
            statusCode: 404,
            message: "You reached a route that is not defined on this server",
        },
    });
});
app.listen(`${port}`, () => {
    console.log(` ⚡️[server]: Server is running at http://localhost:${port}`);
});
//# sourceMappingURL=server.js.map