
const switchActive = document.getElementById("switch");
const switchFullBlock = document.getElementById("switch-fb");
const switchSoftBlock = document.getElementById("switch-sb");
const switchViewVideo = document.getElementById("switch-vv");

const showMoreInput = document.getElementById("show-more-input");
const moreInfoSection = document.getElementById("info-section");


initializeActiveStatus();

if (switchActive) {
    switchActive.addEventListener('click', () => handleClick(0));
    
    if (switchFullBlock && switchSoftBlock && switchViewVideo) {
        switchFullBlock.addEventListener('click', () => handleClick(1));
        switchSoftBlock.addEventListener('click', () => handleClick(2));
        switchViewVideo.addEventListener('click', () => handleClick(3));
    }
} else {
    console.log("Element not found");
}

if(showMoreInput){
    showMoreInput.addEventListener("click",function(){
        const text = document.getElementById("more-less");
        if(getShowMoreStatus() && moreInfoSection){
            text.textContent = "Less";
            moreInfoSection.style.display = "block";

        }else{
            text.textContent = "More";
            moreInfoSection.style.display = "none";
        }
    })
}else{
    console.log("Element not Found");
}
document.addEventListener('DOMContentLoaded', function () {

    const tooltip = document.getElementById('version');
    let manifestData = chrome.runtime.getManifest();

    tooltip.textContent = `${manifestData.version}`;
});

function initializeActiveStatus(){ 
    try {
        getConfigFromStorage().then(config => {
            if (config !== undefined) {
                restoreConfig(config);
            }
        });
    } catch (error) {
        console.error("Error initializing active status:", error);
    }
}

/* Aux Functions */
function getShowMoreStatus(){
    return document.getElementById("show-more-input").checked;
}

function handleClick(source) {
    if(updateUI(source) == -1){
        setConfigStorage();
        return;
    }
    setConfigStorage();
    reloadTab();
}
function updateUI(source){
    let config = getConfig();
    if(config[0] == true){
        setSoftBlockStatus(true);
        if(source == 2){
            return -1;
        }
    }else{
        setSoftBlockStatus(false);
        setViewAsVideoStatus(false);
        setFullBlockStatus(false);
        if(source != 0){return -1;}
    }
    if(config[1] == true && source == 1){
        setFullBlockStatus(true);
        setViewAsVideoStatus(false);
    }
    if(config[3] == true && source == 3){
        setFullBlockStatus(false);
        setViewAsVideoStatus(true);
    }
}

/* GETTERS */

/*Returns the array, containing the information about which of the radios is active*/
function getConfig(){
    return [
        getActiveStatus(), 
        getFullBlockStatus(), 
        getSoftBlockStatus(), 
        getViewAsVideoStatus()
    ];
}

function getActiveStatus(){
    return document.getElementById("switch").checked;
}

function getFullBlockStatus(){
    return document.getElementById("switch-fb").checked;
}

function getSoftBlockStatus(){
    return document.getElementById("switch-sb").checked;
}

function getViewAsVideoStatus(){
    return document.getElementById("switch-vv").checked;
}

async function getConfigFromStorage() { 
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

/* SETTERS */

 /*Change the front end, based on stored values*/
function restoreConfig(config){
    if(config[0]){setActiveStatus(true);}
    if(config[1]){setFullBlockStatus(true);}
    if(config[2]){setSoftBlockStatus(true);}
    if(config[3]){setViewAsVideoStatus(true)}
}

function setActiveStatus(status){
    return document.getElementById("switch").checked = status;
}
function setFullBlockStatus(status){
    return document.getElementById("switch-fb").checked = status;
}

function setSoftBlockStatus(status){
    return document.getElementById("switch-sb").checked = status;
}

function setViewAsVideoStatus(status){
    return document.getElementById("switch-vv").checked = status;
}

async function setConfigStorage(){
    let status = getConfig();
    await chrome.storage.local.set({Shorts: status}, function() {
        console.log('Settings saved');
      });
}


function reloadTab(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        if(tabs[0].url.includes("https://www.youtube.com") ){
            chrome.tabs.update(tabs[0].id, {url: tabs[0].url});
        }
    });
}

