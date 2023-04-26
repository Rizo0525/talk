var API = (()=>{
    const BASE_URL = 'https://study.duyiedu.com'
    const TOKEN_KEY = 'token'

    function get(path){
        const headers = {}
        const token = localStorage.getItem(TOKEN_KEY)
        if(token){
            headers.authorization = `Bearer ${token}`
        }
        return fetch(BASE_URL+path,{headers})
    }
    function post(path,bodyObj){
        const headers = {
            'Content-Type': 'application/json'
        }
        const token = localStorage.getItem(TOKEN_KEY)
        if(token){
            headers.authorization = `Bearer ${token}`
        }
        return fetch(BASE_URL+path,{headers,method:"POST",body:JSON.stringify(bodyObj)})
    }

    async function reg(userInfo){
        return await post('/api/user/reg',userInfo).then((resp)=>{
            return resp.json()
        })
    }

    async function login(loginInfo){
        const resp = await post('/api/user/login',loginInfo)
        const res = await resp.json()
        if(res.code === 0){
            const token = resp.headers.get('authorization')
            localStorage.setItem(TOKEN_KEY, token)
            console.log('登录成功:',token)
        }
        return res
    }
    async function exists(loginId){
        const resp = await get('/api/user/exists?loginId='+loginId)
        return await resp.json()
    }
    async function profile(){
        const resp = await get('/api/user/profile')
        // console.log(resp)
        // console.log(resp.json())
        return await resp.json()
    }
    async function sendChat(content){
        const resp = await post('/api/chat',{content})
        return await resp.json()
    }
    async function getHistory(){
        const resp = await get('/api/chat/history')
        return await resp.json()
    }
    function loginout(){
        localStorage.removeItem(TOKEN_KEY)
    }
    return {
        reg,login,exists,profile,sendChat,getHistory,loginout
    }
})()