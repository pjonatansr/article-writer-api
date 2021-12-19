const Koa = require("koa");
const Router = require("koa-router");
const render = require("koa-ejs");
const path = require("path");
const articleSample = require("./sample/article");

const app = new Koa();
const router = new Router();

render(app, {
    root: path.join(__dirname, "views"),
    layout: "template",
    viewExt: "html",
    cache: false,
    debug: false,
    async: true
});

router.all('', async ctx => {
    await ctx.render("index");
});

router.get("/articles", async ctx => {
    await ctx.render("articles", {
        //params: ctx.request.params
    });
    return (ctx.status = 201);
});

router.get("/article/:id", ctx => {
    //TO-DO Id treatment
    ctx.body = JSON.stringify(articleSample, null, 4);
    return (ctx.status = 201);
});

router.all(/.*/, async ctx => {
    await ctx.render("404");
});

app.use(router.routes()).use(router.allowedMethods());
app.listen(3000);