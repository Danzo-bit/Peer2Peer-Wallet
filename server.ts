import express, { Express, Request, Response } from "express";
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();

//create an express server
const app: Express = express();
const port = process.env.PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/payment-system", require("./src/controller"));

app.use("*", (req: Request, res: Response) => {
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
        console.log(
                ` ⚡️[server]: Server is running at http://localhost:${port}`
        );
});
