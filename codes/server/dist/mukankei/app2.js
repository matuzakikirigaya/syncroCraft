"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_1 = __importDefault(require("koa"));
const koa_router_1 = __importDefault(require("koa-router"));
const koa = new koa_1.default();
const router = new koa_router_1.default();
const router_2 = new koa_router_1.default();
function app2() {
    router.get("/test", (ctx, next) => {
        console.log("using router", ctx.method, ctx.url);
        ctx.body = "Hello World!!";
    });
    router.get("/test2", (ctx, next) => {
        console.log("using router!!", ctx.method, ctx.url);
        ctx.body = "Hello World!!";
    });
    router_2.get("/sample", (ctx, next) => {
        console.log("using router_2!!", ctx.method, ctx.url);
        ctx.body = "Hello World!!";
    });
    koa.use(router.routes());
    koa.use(router.allowedMethods());
    // koa.use(router_2.routes()) してないので、sampleは繋げないよ
    koa.listen(3000, () => {
        console.log("Server started!!");
    });
}
exports.app2 = app2;
//# sourceMappingURL=app2.js.map