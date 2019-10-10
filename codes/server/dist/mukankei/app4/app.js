"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_1 = __importDefault(require("koa"));
const koa_router_1 = __importDefault(require("koa-router"));
//const user = require('./index');
const db = require("./db");
const koa = new koa_1.default();
const router = new koa_router_1.default();
function app4() {
    router.get("/test", (ctx, next) => {
        console.log("using router", ctx.method, ctx.url);
        ctx.body = "Hello World!!";
    });
    router.get("/test2", (ctx, next) => {
        console.log("using router!!", ctx.method, ctx.url);
        ctx.body = "Hello World!!";
    });
    router.get("/data", async (ctx, next) => {
        console.log("search data!!", ctx.method, ctx.url);
        const data = await db.findOne({ field_a: "りんご" });
        ctx.body = data;
        console.log(data);
        return next();
    });
    koa.use(router.routes());
    koa.use(router.allowedMethods());
    koa.listen(3000, () => {
        console.log("Server started!!");
    });
}
exports.app4 = app4;
//# sourceMappingURL=app.js.map