// Copyright © 2018 Intel Corporation. All Rights Reserved.
// REST samples. It sends HTTP requests to sample server, and sample server sends requests to conference server.
// Both this file and sample server are samples.
var send = function (method, path, body, onRes, host) {
    var req = new XMLHttpRequest()
    req.onreadystatechange = function () {
        if (req.readyState === 4) {
            onRes(req.responseText);
        }
    };
    let url = generateUrl(host, path);
    req.open(method, url, true);
    req.setRequestHeader('Content-Type', 'application/json');
    if (body !== undefined) {
        req.send(JSON.stringify(body));
    } else {
        req.send();
    }
};

var generateUrl = function (host, path) {
    let url;
    if (host !== undefined) {
        url = host + path; // Use the host user set.
    } else {
        let index = document.URL.lastIndexOf('\/');
        url = document.URL.substring(0, index) + path; // Get the string before last '/'.
    }
    return url;
}

var onResponse = function (result) {
    if (result) {
        try {
            console.info('Result:', JSON.parse(result));
        } catch (e) {
            console.info('Result:', result);
        }
    } else {
        console.info('Null');
    }
};

var mixStream = function (room, stream, callbak, host) {
    var cab = callbak || onResponse
    send('PUT', '/meeting-control/meetings/' + room + '/streams/' + stream + '/mixed', {}, cab, host);
};

// 关闭音/视频
var mediaPaused = function (room, user, body, callback, host) {

    send('PUT', '/meeting-control/meetings/' + room + '/users/' + user + '/paused', body, callback, host);
};

var createToken = function (room, user, role,origin, callback, host) {
    var body = {
        user: user,
        role: role,
        origin:origin
    };
    send('POST', '/meeting-control/meetings/' + room + '/token', body, callback, host);
};
