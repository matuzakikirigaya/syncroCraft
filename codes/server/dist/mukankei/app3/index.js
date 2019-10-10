"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_router_1 = __importDefault(require("koa-router"));
exports.router = new koa_router_1.default();
exports.router.get("/user", (ctx, next) => {
    console.log(ctx.method, ctx.url);
    ctx.body = "user route!!";
});
// module.exports = router;
//# sourceMappingURL=index.js.map