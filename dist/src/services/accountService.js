"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateWallet = void 0;
const dotenv = require("dotenv");
const fetch = require("node-fetch");
dotenv.config();
const secretKey = process.env.SECRET_KEY;
const publicKey = process.env.PUBLIC_KEY;
function generateWallet(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
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
            response = yield fetch("https://api.wallets.africa/wallet/generate", options);
        }
        catch (err) {
            console.log(err);
            return err.message;
        }
        return response.text();
        next();
    });
}
exports.generateWallet = generateWallet;
//# sourceMappingURL=accountService.js.map