import Koa from "koa";
import Router from "koa-router";

const koa = new Koa();
const router = new Router();
const router_2 = new Router();

export function app2() {
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
