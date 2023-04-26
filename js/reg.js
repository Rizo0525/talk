const loginId = new FieldValidator('txtLoginId',async function(val){
    if(!val){ 
        return '请填写账号'
    }
    const resp = await API.exists(val)
    // console.log(resp)
    if(resp.data){
        return '该账号已被占用'
    }
})
const nickName = new FieldValidator('txtNickname',async function(val){
    if(!val){
        return '请填写昵称'
    }
})
const loginPwd = new FieldValidator('txtLoginPwd',async function(val){
    if(!val){
        return '请填写密码'
    }
})
const loginPwdConfirm = new FieldValidator('txtLoginPwdConfirm',async function(val){
    if(!val){
        return '请填写确认密码'
    }
    if(val!==loginPwd.input.value){
        return '两次密码不一致'
    }
})
const form = $('.user-form')
form.onsubmit = async function(e){
    e.preventDefault()
    const result = await FieldValidator.validate(loginId,nickName,loginPwd,loginPwdConfirm)
    if(!result){
        return;
    }else{
        // API.reg()
        const formData = new FormData(form)   //靠标签属性name拿值  pwdConfirm没有name 所以不拿
        const data = Object.fromEntries(formData.entries())
        const resp = await API.reg(data)
        if(resp.code === 0){
            alert('注册成功')
            location.href = './login.html'
        }
    }
}