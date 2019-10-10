"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//app.js
const koa_1 = __importDefault(require("koa"));
const koa_router_1 = __importDefault(require("koa-router"));
//読込みしたいファイル名を記述する('.js'は不要)
const index_1 = require("./index");
const koa = new koa_1.default();
const router = new koa_router_1.default();
function app3() {
    router.get("/test", (ctx, next) => {
        console.log("using router", ctx.method, ctx.url);
        ctx.body = "Hello World!!";
    });
    router.get("/test2", (ctx, next) => {
        console.log("using router!!", ctx.method, ctx.url);
        ctx.body = "Hello World!!";
    });
    koa.use(router.routes());
    koa.use(router.allowedMethods());
    koa.use(index_1.router.routes());
    koa.listen(3000, () => {
        console.log("Server started!!");
    });
}
exports.app3 = app3;
//# sourceMappingURL=app.js.map