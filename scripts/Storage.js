function setConfig(config){
    chrome.storage.local.set({Shorts: config}, function() {
        console.log('Settings saved');
      });
}


async function getConfig() { 
    return new Promise((resolve) => {
        chrome.storage.local.get({ Shorts: [] }, (result) => {
            resolve(result.Shorts);
        });
    });
}
