module.exports={
    register:async(name,pwd)=>{
        let data
        if(name=='geqi'&&pwd=='123456')
        {
            data={
                status:0,
                data:{
                    title:"个人中心",
                    content:"欢迎老弟"
                }
            }
        }
        else{
            data={
                status:-1,
                data:{
                    title:'老弟 来错了',
                    content:'老弟你信息有问题呀'
                }
            }
        }
        return data;
    }
}