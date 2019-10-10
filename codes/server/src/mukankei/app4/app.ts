import Koa from "koa";
import Router from "koa-router";
//const user = require('./index');
const db = require("./db");

const koa = new Koa();
const router = new Router();

export function app4() {
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
