const https = require("https");
const dotenv = require("dotenv");
import { Response } from "express";
const fetch = require("node-fetch");

dotenv.config();

const P_SECRET_KEY = process.env.P_SECRET_KEY;
// const P_PUBLIC_KEY = process.env.P_PUBLIC_KEY;
//verify account number
async function verifyUserAccount(accountNumber: string, bankCode: string) {
        try {
                const options = {
                        headers: {
                                Authorization: `Bearer ${P_SECRET_KEY}`,
                                "Content-Type": "application/json",
                        },
                };
                const response = await fetch(
                        `https://api.paystack.co/bank/resolve?account_number=${accountNumber}&bank_code=${bankCode}`,
                        options
                );
                console.log(response);
        } catch (err) {
                console.log(err);
                return err.message;
        }
}

//create transfer client
async function createClientAccount(
        name: string,
        accountNumber: string,
        bankCode: string
) {
        const options = {
                method: "POST",
                body: JSON.stringify({
                        type: "nuban",
                        name: `${name}`,
                        account_number: `${accountNumber}`,
                        bank_code: `${bankCode}`,
                        currency: "NGN",
                }),
                headers: {
                        Authorization: `Bearer ${P_SECRET_KEY}`,
                        "Content-Type": "application/json",
                },
        };
        const response = await fetch(
                `https://api.paystack.co/transferrecipient`,
                options
        );
        return response;
}

//initiate a transfer
async function initiateTransfer(
        recipientId: string,
        amount: number,
        reason: string
) {
        const params = JSON.stringify({
                source: "balance",
                amount: `${amount}`,
                recipient: `${recipientId}`,
                reason: `${reason}`,
        });
        const options = {
                hostname: "api.paystack.co",
                port: 443,
                path: "/transfer",
                method: "POST",
                headers: {
                        Authorization: "Bearer SECRET_KEY",
                        "Content-Type": "application/json",
                },
        };
        const req = https
                .request(options, (res: Response) => {
                        let data = "";
                        res.on("data", (chunk) => {
                                data += chunk;
                        });
                        res.on("end", () => {
                                console.log(JSON.parse(data));
                        });
                })
                .on("error", (error: Error) => {
                        console.error(error);
                });
        req.write(params);
        
}

export { verifyUserAccount };
export { initiateTransfer };
export { createClientAccount };
