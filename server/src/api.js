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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.vendEspees = exports.fetchUserWallet = exports.fetchVendingToken = void 0;
// import fetch from "node-fetch";
var crypto = require("crypto");
var apiKey = "V9yKoxl5EljDbawloXWHaD2zgclp28U9f5YSY3U3";
var agentWallet = "0x0bd3e40f8410ea473850db5479348f074d254ded";
var agentPin = "1234";
var hash = crypto.randomBytes(8).toString("hex");
console.log(hash);
var fetchVendingToken = function () { return __awaiter(void 0, void 0, void 0, function () {
    var body, response, responseData;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                body = {
                    vending_wallet_address: agentWallet,
                    vending_wallet_pin: agentPin,
                    vending_hash: hash,
                };
                console.log("fetchVendingToken request", body);
                return [4 /*yield*/, fetch("https://api.espees.org/agents/vending/createtoken", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "x-api-key": apiKey,
                        },
                        body: JSON.stringify({
                            vending_wallet_address: agentWallet,
                            vending_wallet_pin: agentPin,
                            vending_hash: hash,
                        }),
                    })];
            case 1:
                response = _a.sent();
                return [4 /*yield*/, response.json()];
            case 2:
                responseData = _a.sent();
                console.log("fetchVendingToken response", responseData);
                return [2 /*return*/, responseData];
        }
    });
}); };
exports.fetchVendingToken = fetchVendingToken;
var fetchUserWallet = function (username) { return __awaiter(void 0, void 0, void 0, function () {
    var body, response, responseData;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                body = { username: username };
                console.log("fetchUserWallet request", body);
                return [4 /*yield*/, fetch("https://api.espees.org/user/address", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "x-api-key": apiKey,
                        },
                        body: JSON.stringify(body),
                    })];
            case 1:
                response = _a.sent();
                if (!response.ok) {
                    throw new Error("Failed to fetch wallet for user ".concat(username));
                }
                return [4 /*yield*/, response.json()];
            case 2:
                responseData = _a.sent();
                console.log("fetchUserWallet response", responseData);
                return [2 /*return*/, responseData];
        }
    });
}); };
exports.fetchUserWallet = fetchUserWallet;
var vendEspees = function (username, vendingAmount) { return __awaiter(void 0, void 0, void 0, function () {
    var vendingTokenResponse, vendingToken, userWalletResponse, userWalletAddress, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, exports.fetchVendingToken)()];
            case 1:
                vendingTokenResponse = _a.sent();
                vendingToken = vendingTokenResponse.vending_token;
                return [4 /*yield*/, (0, exports.fetchUserWallet)(username)];
            case 2:
                userWalletResponse = _a.sent();
                userWalletAddress = userWalletResponse.wallet_address;
                return [4 /*yield*/, fetch("https://api.espees.org/v2/vending/vend", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "x-api-key": apiKey,
                        },
                        body: JSON.stringify({
                            vending_token: vendingToken,
                            user_wallet: userWalletAddress,
                            amount_in_espees: vendingAmount,
                        }),
                    })];
            case 3:
                response = _a.sent();
                if (!response.ok) {
                    throw new Error("Failed to vend Espees");
                }
                return [2 /*return*/, response.json()];
        }
    });
}); };
exports.vendEspees = vendEspees;
