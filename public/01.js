var childwin;
const childname = "popup";

function openChild() {
    childwin = window.open('page2.html', childname, 'height=300px, width=500px');
}

function sendMessage() {
    let msg = {
        pName: "Bob",
        pAge: "35"
    };
    // childwin.postMessage(msg);
    // childwin.focus();
}

function send2SW() {
    let msg = {
        command: "print",
        sentence: "Hello Service Worker!",
        url: '"https://sistinalove.github.io/SWtesting/sw.js"',
        url2: '"https://web-sdk.urbanairship.com/notify/v1/ua-sdk.min.js"',
        url3: "sample.js",
        type: "push",
        push: "https://www.google.com",
        action: "preview",
        headers: {
            "Content-Type": "application/json"
        },
        payload: JSON.stringify({
            title: "T.title",
            body: JSON.stringify({
                title: "t.body.title",
                body: "t.body.body",
                data: "t.body.data"
            }),
            type: "log",
            uuid: "031125",
            data: JSON.stringify({
                title: "i.data.title 하나",
                body: "i.data.body 둘",
                data: "push data",
                action: "push"
            })
        })
    };

    let testMsg = {
        command: "push",
        url: "'https://sistinalove.github.io/SWtesting/sw.js'",
        payload: JSON.stringify({
            title: "Push Message Title",
            body: "Push Message Body"
        })
    }

    let testMsg2 = {
        command: "fetch",
        url: '"https://sistinalove.github.io/SWtesting/sw.js"',
        payload: {
            title: "Push Message Title",
            body: "Push Message Body"
        }

    }

    let testMsg3 = {
        command: "import",
        url: "'https://sistinalove.github.io/SWtesting/sw.js'",
        payload: {
            title: "Push Message Title",
            body: "Push Message Body"
        }

    }

    // 서비스 워커가 있으면 DOM -> SW로 MSG 보내기
    if (navigator.serviceWorker.controller) {
        console.log("********PUSH******");
        navigator.serviceWorker.controller.postMessage(testMsg);


    }
}

function send3SW() {
    let testMsg2 = {
        command: "fetch",
        url: '"https://sistinalove.github.io/SWtesting/sw.js"',
        payload: {
            title: "Push Message Title",
            body: "Push Message Body"
        }
    }

    // 서비스 워커가 있으면 DOM -> SW로 MSG 보내기
    if (navigator.serviceWorker.controller) {
        console.log("********FETCH******");
        navigator.serviceWorker.controller.postMessage(testMsg2);


    }
}