import Koa from "koa";
import Router from "koa-router";

export const router = new Router();

router.get("/user", (ctx, next) => {
  console.log(ctx.method, ctx.url);
  ctx.body = "user route!!";
});

// module.exports = router;
