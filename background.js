var data = "";
function getRes(url,data,requestHeaders){
    fetch(url, {
    method: 'POST',
    headers: requestHeaders,
    body: data,
    })
    .then(response => response.text())
    .then(
        function(data){
            if(data.indexOf("purl") != -1 && data.indexOf("albumName") != -1){
                console.log(data);
                const fileRegex = /"purl":"([^"]+)"/;
                filename = data.match(fileRegex)[1];
                console.log("url: " + "" + filename);
                chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
                    // 向Content Scripts发送消息
                    chrome.tabs.sendMessage(tabs[0].id, { from: 'Service Worker', url: "http://ws.stream.qqmusic.qq.com/"+filename});
                  });
            }
        }
    )
    .catch(error => console.error('Error:', error));
}

chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
        if(details.method == "POST" && details.url.indexOf("musics.fcg") != -1 && details.url.indexOf("luc1fer") == -1){
            data = decodeURIComponent(String.fromCharCode.apply(null,
                new Uint8Array(details.requestBody.raw[0].bytes)));
        }
    },
    { urls: ["<all_urls>"] },
    ["requestBody"]
);


chrome.webRequest.onSendHeaders.addListener(
    function(details) {
        if(details.method == "POST" && details.url.indexOf("musics.fcg") != -1 && details.url.indexOf("luc1fer") == -1){
            let headers = [];
            for(let i=0;i < details.requestHeaders.length;i++){
                headers[i] = [details.requestHeaders[i]["name"],details.requestHeaders[i]["value"]];
            }
            let url = details.url+"&luc1fer";
            console.log(data);
            if(data.length > 0){
                getRes(url,data,headers);
                data = "";
            }else{
                console.log("data is null!");
            }
        }
    },
    { urls: ["<all_urls>"] },
    ["requestHeaders","extraHeaders"]
);