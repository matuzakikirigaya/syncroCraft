import Koa from "koa";
import Router from "koa-router";

const router = new Router();
const koa = new Koa();
//`app`と名付けられることが多い変数です。Expressと混同しないように今回はあえて`koa`と名付けました。

router.get("/test", (ctx, next) => {
  console.log("get");
  ctx.body = "Hello World!!";
});

koa.use(router.routes());
koa.use(router.allowedMethods());

koa.listen(3000, () => {
  console.log("Server started!!");
});
