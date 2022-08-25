let chatcount = 0;
let newswitch = 1;

$(document).ready(() => {
    const websocket = new WebSocket("wss://web.lite24.net/ws/chat");

    const defaultHeight = document.documentElement.scrollHeight;

    function check() {
        return window.scrollY + defaultHeight >= document.documentElement.scrollHeight - defaultHeight * 0.08;
    }

    websocket.onopen = (evt) => {
        console.log("connected");
    }
    websocket.onclose = (evt) => {
        console.log("disconnected");
    }

    websocket.onmessage = (evt) => {
        const list = $("body");
        const split = evt.data.split("@null");
        const rank = split[0];
        const player = split[1];
        const message = split[2];
        const time = split[3];

        const b = check();

        if (!b) {
            if (newswitch === 1) {
                let mmain = document.querySelector('#mainbody');
                let newline = document.createElement('div');
                newline.setAttribute('class', 'newline');
                mmain.appendChild(newline);
                let newtext = document.createElement('div');
                newtext.setAttribute('class', 'newtext');
                newtext.innerText = "NEW";
                newline.appendChild(newtext);
                newswitch = 0;
                console.log('newline');
            }
        }

        let tmp = `<div class="chat"><p class="white shadow timer">${time}</p><div class="width">`
        switch (rank) {
            case '0':
                tmp += `<div class="user_color"></div></div><div class="yellow shadow item">`;
                break;
            case '1':
                tmp += `<div class="manager_color"></div></div><div class="green shadow item">`;
                break;
            case '2':
                tmp += `<div class="developer_color"></div></div><div class="light_purple shadow item">`;
                break;
        }


        list.append(tmp + `<span>${player}</span></div><span class="white shadow text">${message}</span></div>`);
        console.log('add chat');

        chatcount++;

        if (b) {
            document.querySelector("#alerter").className = "chatalertdap";
            window.scrollTo({left: 0, top: document.body.scrollHeight, behavior: "smooth"});
            chatcount = 0;
        } else {
            document.querySelector("#alerter").className = "chatalert";
            document.getElementById("altchild").innerText = chatcount <= 1 ? `새로운 채팅이 올라왔어요.` : `새로운 채팅이 ${chatcount}개 올라왔어요.`;
        }
    };

    window.onscroll = function () {
        if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
            document.querySelector("#fixedMenu").className = "myFixedMenu-box-shadow";
        } else {
            document.querySelector("#fixedMenu").className = "myFixedMenu";
        }

        if (check()) {
            if(newswitch===0){
                document.querySelector("#alerter").className = "chatalertdap";
                chatcount = 0;
                let nl = document.querySelector('.newline');
                nl.remove();
                newswitch = 1;
            }
        }
    }

    document.onkeydown = function () {
        if (event.keyCode === 27) {
            window.scrollTo(0, document.body.scrollHeight);
            document.querySelector("#alerter").className = "chatalertdap";
            chatcount = 0;
            if(newswitch===0) {
                let nl = document.querySelector('.newline');
                nl.remove();
            }
            newswitch = 1;
        }
    }
})
