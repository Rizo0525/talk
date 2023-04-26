const loginId = new FieldValidator('txtLoginId',async function(val){
    if(!val){ 
        return '请填写账号'
    }
})

const loginPwd = new FieldValidator('txtLoginPwd',async function(val){
    if(!val){
        return '请填写密码'
    }
})
const form = $('.user-form')
form.onsubmit = async function(e){
    e.preventDefault()
    const result = await FieldValidator.validate(loginId,loginPwd)
    if(!result){
        return;
    }else{
        // API.reg() 
        const formData = new FormData(form)   //靠标签属性name拿值  pwdConfirm没有name 所以不拿
        const data = Object.fromEntries(formData.entries())
        const resp = await API.login(data)
        console.log(resp)
        if(resp.code === 0){
            alert('登录成功')
            location.href = './index.html'
        }
    }
}