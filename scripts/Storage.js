function setChecked(status){
    chrome.storage.local.set({'Shorts': status}, function() {
        console.log('Settings saved');
      });
}


async function getChecked(){ 
    let result = await chrome.storage.local.get(["Shorts"]);
    if(result.Shorts === true){
        return true;
    }
    if(result.Shorts == undefined){
        setChecked(false);
        return false;
    }
    console.log(result);
    return true;
}
