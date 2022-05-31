import { Request, Response, NextFunction } from "express";
const dotenv = require("dotenv");
const fetch = require("node-fetch");

dotenv.config();

const secretKey = process.env.SECRET_KEY;
const publicKey = process.env.PUBLIC_KEY;

async function generateWallet(req: Request, res: Response, next: NextFunction) {
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const email = req.body.email;
        const bvn = req.body.bvn;
        const currency = req.body.currency;
        const dateOfBirth = req.body.dateOfBirth;

        const options = {
                method: "POST",
                body: JSON.stringify({
                        firstName: `${firstName}`,
                        lastName: `${lastName}`,
                        email: `${email}`,
                        Bvn: `${bvn}`,
                        currency: `${currency}`,
                        secretKey: `${secretKey}`,
                        dateOfBirth: `${dateOfBirth}`,
                }),
                headers: {
                        "content-type": "application/json",
                        Authorization: "Bearer " + publicKey,
                },
        };
        let response;
        try {
                response = await fetch(
                        "https://api.wallets.africa/wallet/generate",
                        options
                );
        } catch (err) {
                console.log(err);
                return err.message;
        }
        return response.text();
        next();
}

export { generateWallet };
