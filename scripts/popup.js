let switchElement = document.getElementById("switch");

getChecked().then(value =>{
    if(value === true){
        setToogleStatus(true);
    }
})

if(switchElement) {
     switchElement.addEventListener('click', function() {
            setChecked(getToogleStatus()).then(
                () => reloadTab()
            );
        });
} else {
    console.log("Element not Found");
}

function getToogleStatus(){
    return document.getElementById("switch").checked;
}

function setToogleStatus(status){
    return document.getElementById("switch").checked = status;
}

async function setChecked(status){
    await chrome.storage.local.set({'Shorts': status}, function() {
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
    return false;
}

function reloadTab(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        if(tabs[0].url.includes("https://www.youtube.com") ){
            chrome.tabs.update(tabs[0].id, {url: tabs[0].url});
        }
    });
}
