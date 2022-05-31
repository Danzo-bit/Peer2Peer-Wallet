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
exports.createClientAccount = exports.initiateTransfer = exports.verifyUserAccount = void 0;
const https = require("https");
const dotenv = require("dotenv");
const fetch = require("node-fetch");
dotenv.config();
const P_SECRET_KEY = process.env.P_SECRET_KEY;
// const P_PUBLIC_KEY = process.env.P_PUBLIC_KEY;
//verify account number
function verifyUserAccount(accountNumber, bankCode) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const options = {
                headers: {
                    Authorization: `Bearer ${P_SECRET_KEY}`,
                    "Content-Type": "application/json",
                },
            };
            const response = yield fetch(`https://api.paystack.co/bank/resolve?account_number=${accountNumber}&bank_code=${bankCode}`, options);
            console.log(response);
        }
        catch (err) {
            console.log(err);
            return err.message;
        }
    });
}
exports.verifyUserAccount = verifyUserAccount;
//create transfer client
function createClientAccount(name, accountNumber, bankCode) {
    return __awaiter(this, void 0, void 0, function* () {
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
        const response = yield fetch(`https://api.paystack.co/transferrecipient`, options);
        return response;
    });
}
exports.createClientAccount = createClientAccount;
//initiate a transfer
function initiateTransfer(recipientId, amount, reason) {
    return __awaiter(this, void 0, void 0, function* () {
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
            .request(options, (res) => {
            let data = "";
            res.on("data", (chunk) => {
                data += chunk;
            });
            res.on("end", () => {
                console.log(JSON.parse(data));
            });
        })
            .on("error", (error) => {
            console.error(error);
        });
        req.write(params);
    });
}
exports.initiateTransfer = initiateTransfer;
//# sourceMappingURL=paymentService.js.map