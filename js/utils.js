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
exports.textFormats = void 0;
exports.truncate = truncate;
exports.separate = separate;
exports.getDateObject = getDateObject;
exports.delay = delay;
const prompts_1 = require("@inquirer/prompts");
// reusable functions
exports.textFormats = {
    normal: (text) => text,
    red: (text) => `\u001B[31m${text}\u001B[39m`,
    blue: (text) => `\u001B[34m${text}\u001B[39m`,
    bold: (text) => `\u001B[1m${text}\u001B[22m`,
};
function truncate(text, length) {
    if (length >= text.length)
        return text;
    return text.slice(0, length) + "...";
}
function separate(color = "normal") {
    console.log(exports.textFormats[color](new prompts_1.Separator().separator.repeat(4)));
}
function getDateObject(dateString) {
    const dateObject = new Date(dateString);
    return dateObject.toString().toLowerCase() === "invalid date"
        ? undefined
        : dateObject;
}
function delay(milliSeconds) {
    return __awaiter(this, void 0, void 0, function* () {
        yield new Promise((res) => setTimeout(res, milliSeconds));
    });
}
