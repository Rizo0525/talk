document.querySelector('#txtLoginId')
document.querySelector('#txtLoginPwd')

class FieldValidator{
    /**
     * @param {String} txtId 文本框id
     * @param {Function} validatorFunc 验证规则函数
     */
    constructor(txtId,validatorFunc){
        this.input = $('#'+txtId)
        this.p = this.input.nextElementSibling
        this.validatorFunc = validatorFunc
        this.input.onblur = ()=>{
            this.validate()
        }
    }
    /**
     * 成功 return true
     */
    async validate(){
        
        const err = await this.validatorFunc(this.input.value)
        console.log(err)
        if(err){
            this.p.innerHTML = err
            return false
        }
        return true
    }
    
    static async validate(...validators){
        const promise = validators.map(v=>v.validate())
        const results = await Promise.all(promise)
        console.log(results)
        return results.every(r=>r)
    }
}

// var loginId = new FieldValidator('txtLoginId',async function(val){
//     if(!val){
//         return '请填写账号'
//     }
//     const resp = await API.exists(val)
//     // console.log(resp)
//     if(resp.data){
//         return '该账号已被占用'
//     }
// })
// var nickName = new FieldValidator('txtNickname',async function(val){
//     if(!val){
//         return '请填写昵称'
//     }
//     const resp = await API.exists(val)
//     // console.log(resp)
//     if(resp.data){
//         return '该密码错误'
//     }
// })
// async function test(){
//     const result = await FieldValidator.validate(loginId,nickName)
//     console.log(result)
// }