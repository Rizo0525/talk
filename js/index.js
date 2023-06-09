(async ()=>{
    const resp = await API.profile()
    console.log(resp)
    console.log(resp.data)
    const user = resp.data
    if(!user){
        alert('未登录或登录已过期')
        location.href = './login.html'
        return;
    }

    const doms = {
        aside:{
            nickname:$('#nickname'),
            loginId:$('#loginId')
        },
        close:$('.close'),
        chatContainer:$('.chat-container'),
        txtMsg:$('#txtMsg'),
        messageContainer:$('.msg-container'),
    }
    doms.close.onclick = function(){
        API.loginout()
        location.href = './login.html'
    } 

    doms.messageContainer.onsubmit = function (e){
        e.preventDefault()
        sendChat()
    }
    loadHistory()
    async function loadHistory(){
        const resp = await API.getHistory()
        for(const item of resp.data){
            addChat(item)
        }
        doms.chatContainer.scrollTop = doms.chatContainer.scrollHeight
    }

    setUserInfo()
    function setUserInfo(){
        doms.aside.nickname.innerText = user.nickname
        doms.aside.loginId.innerText = user.loginId
    }
    /*
    content
    : 
    "今天天气怎么样"
    createdAt
    : 
    1681981020325
    from
    : 
    "liubo333"
    to
    : 
    null
    */
    function addChat(chatInfo){
        const div = $$$('div');
        div.classList.add('chat-item');
        if (chatInfo.from) {
        div.classList.add('me');
        }
        const img = $$$('img');
        img.className = 'chat-avatar';
        img.src = chatInfo.from ? './asset/avatar.png' : './asset/robot-avatar.jpg';

        const content = $$$('div');
        content.className = 'chat-content';
        content.innerText = chatInfo.content;

        const date = $$$('div');
        date.className = 'chat-date';
        date.innerText = formatDate(chatInfo.createdAt);

        div.appendChild(img);
        div.appendChild(content);
        div.appendChild(date);

        doms.chatContainer.appendChild(div);
    }
    function formatDate(timestamp){
        const date = new Date(timestamp)
        const year = date.getFullYear()
        const month = (date.getMonth() + 1).toString().padStart(2,'0')
        const day = date.getDate().toString().padStart(2,'0')
        const hour = date.getHours().toString().padStart(2,'0')
        const minute = date.getMinutes().toString().padStart(2,'0')
        const second = date.getSeconds().toString().padStart(2,'0')
        return `${year}-${month}-${day} ${hour}:${minute}:${second}`
    }
    async function sendChat(){
        const content = doms.txtMsg.value.trim()
        if(!content){
            return;
        }
        addChat({
            from:user.loginId,
            to:null,
            createdAt:Date.now(),
            content
        })
        doms.txtMsg.value = ''
        doms.chatContainer.scrollTop = doms.chatContainer.scrollHeight
        const resp = await API.sendChat(content)
        addChat({
            from:null,
            to:user.loginId,
            ...resp.data
        })
        doms.chatContainer.scrollTop = doms.chatContainer.scrollHeight
    }
})()