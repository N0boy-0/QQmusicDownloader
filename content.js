var songId = 1;
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.from === 'Service Worker') {
      document.querySelector("#app").insertAdjacentHTML('afterend','<div id="myDiv" style="position: absolute; top: '+ songId*50 +'px; right:60px ; background-color: lightblue; padding: 10px;z-index:99999;"><button class="upload_btns__item mod_btn_green mod_btn" onclick=\'window.open("'+message.url+'", "_blank")\'>下载</button></div>');
      songId = songId + 1;
    }
  });