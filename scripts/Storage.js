function setConfig(config){
    chrome.storage.local.set({Shorts: config}, function() {
        console.log('Settings saved');
      });
}


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
