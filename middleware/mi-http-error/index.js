const Path = require('path') 
const nunjucks = require('nunjucks')
module.exports=(opts={})=>{
    const env=opts.env||process.env.NOOE_ENV||'development'
    const folder=opts.errorPageFolder
    const templatePath=Path.resolve(__dirname,'./error.html')
    let fielname='other'
    return async(ctx,next)=>{
        try{
            await next();
            if(ctx.response.status===404&&!ctx.response.body)
            {ctx.throw(404);}
        }
    catch(e)
    {
        let status=parseInt(e.status)
        const message=e.message
        if(status>=400)
        {
            switch(status){
                case 400:
                case 404:
                case 500:
                fielname=status;
                break;
                default:
                fielname='other'
            }
        }
        else{
            status=500
            fielname=status
        }
        const filePath=folder?Path.join(folder,`${fielname}.html`):templatePath
        try{
            nunjucks.configure(folder?folder:__dirname)
            const data=await nunjucks.render(filePath,{
                env:env,
                status:e.status||e.message,
                error:e.message,
                stack:e.stack
            })
            ctx.status=status
            ctx.body=data
        }
        catch(e)
        {
            ctx.throw(500,`错误页面渲染失败:${e.message}`)
        }
    }
    }
}