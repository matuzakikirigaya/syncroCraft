//app.js
import Koa from "koa";
import Router from "koa-router";
//読込みしたいファイル名を記述する('.js'は不要)
import { router as user } from "./index";
const koa = new Koa();
const router = new Router();

export function app3() {
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

  koa.use(user.routes());

  koa.listen(3000, () => {
    console.log("Server started!!");
  });
}
