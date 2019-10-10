"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_1 = __importDefault(require("koa"));
const koa_router_1 = __importDefault(require("koa-router"));
const router = new koa_router_1.default();
const koa = new koa_1.default();
//`app`と名付けられることが多い変数です。Expressと混同しないように今回はあえて`koa`と名付けました。
function start() {
    router.get("/test", (ctx, next) => {
        console.log("get");
        ctx.body = "Hello World!!";
    });
    koa.use(router.routes());
    koa.use(router.allowedMethods());
    koa.listen(3000, () => {
        console.log("Server started!!");
    });
}
exports.start = start;
//# sourceMappingURL=serverstarted.js.map