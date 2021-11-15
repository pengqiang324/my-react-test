const Koa = require('koa')
const router = require('koa-router')()
const koa2Cors = require('koa2-cors')
const koaJson = require('koa-json');
const bodyParser = require('koa-bodyparser');

const app = new Koa()

router.get('/', async (ctx, next) => {
    ctx.respose
    ctx.body = '访问成功'
    await next()
})

router.get('/list', async (ctx, next) => {
    ctx.response.type = 'application/json'
    ctx.body = {
        title: '教父修改了标题',
        msg: '获取成功',
        code: 200
    }
    await next()
})

router.post('/detail/:id', async (ctx, next) => {
    ctx.response.type = 'application/json'
    ctx.body = {
        code: 200,
        msg: '获取成功',
        data: {
            name: '张学友'
        }
    }
    await next()
})

app.use(router.routes(), router.allowedMethods())
app.use(koa2Cors({
    origin: '*', // 允许跨域的地址，我的理解类似白名单，*代表全部允许
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'], // 暴露header列表
    maxAge: 5, // 每隔5秒发送预检请求，也就是发送两次请求
    // credentials: true, // 允许请求携带cookie
    allowMethods: ['OPTIONS', 'GET', 'PUT', 'POST', 'DELETE'], // 请求方式
    allowHeaders: ['Accept', 'Origin', 'Content-type', 'Authorization'],
  }))
app.use(koaJson)
app.use(bodyParser)

app.listen(8089)
console.log('success 8089')