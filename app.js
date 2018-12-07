const Koa=require('koa')
const app=new Koa()
const router=require('./router')
const middleware=require('./middleware')
middleware(app)
router(app)
app.listen(3000,()=>{
    console.log('正在监听')
})