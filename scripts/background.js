  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
            if (changeInfo.status === 'complete' && tab.url.match('https:\/\/.*.youtube.com\/.*')) {
                getConfig().then(config => {
                    if (config == undefined || config == [] || !config[0]) {
                        return;
                    }else{
                        console.log("sent");
                        chrome.tabs.sendMessage(tabId, {
                                message : "Changed Url"
                        });
                    }   
                });
            }
          });


async function getConfig(){ 
    return new Promise((resolve, reject) => {
        chrome.storage.local.get({Shorts: []}, (result) => {
            if (chrome.runtime.lastError) {
                reject(chrome.runtime.lastError);
            } else {
                resolve(result.Shorts);
            }
        });
    });
}