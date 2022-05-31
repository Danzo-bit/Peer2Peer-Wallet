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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const { generateWallet } = require("./services/accountService");
const { createClientAccount, initiateTransfer, verifyUserAccount, } = require("./services/paymentService");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
module.exports = router;
router.post("/users/create-account", createAccount);
router.get("/users/transfer", makepayment);
function createAccount(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield generateWallet(req, res, next);
        res.writeHead(200, "Wallet created successfully", {
            "Content-Type": "application/json",
        });
        res.end(response);
    });
}
function makepayment(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let response = yield verifyUserAccount(req.body.accountNumber, req.body.bankCode);
        response = yield createClientAccount(req.body.receipientName, req.body.accountNumber);
        console.log("Response --> {}", response);
        //         const recipientId = response.data;
        response = yield initiateTransfer(req.body.amount, 
        //       recipientId,
        req.body.reason);
        res.writeHead(200, {
            contentType: "application/json",
        });
        res.end(response);
        next();
    });
}
//# sourceMappingURL=controller.js.map