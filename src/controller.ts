const { generateWallet } = require("./services/accountService");
const {
        createClientAccount,
        initiateTransfer,
        verifyUserAccount,
} = require("./services/paymentService");
import express, { Request, Response, NextFunction } from "express";
const router = express.Router();
module.exports = router;
router.post("/users/create-account", createAccount);
router.get("/users/transfer", makepayment);

async function createAccount(req: Request, res: Response, next: NextFunction) {
        const response = await generateWallet(req, res, next);
        res.writeHead(200, "Wallet created successfully", {
                "Content-Type": "application/json",
        });
        res.end(response);
}

async function makepayment(req: Request, res: Response, next: NextFunction) {
        let response = await verifyUserAccount(
                req.body.accountNumber,
                req.body.bankCode
        );
        response = await createClientAccount(
                req.body.receipientName,
                req.body.accountNumber
        );
        console.log("Response --> {}", response);
        //         const recipientId = response.data;
        response = await initiateTransfer(
                req.body.amount,
                //       recipientId,
                req.body.reason
        );
        res.writeHead(200, {
                contentType: "application/json",
        });
        res.end(response);

        next();
}
