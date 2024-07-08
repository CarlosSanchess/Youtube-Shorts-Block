
const switchActive = document.getElementById("switch");
const switchFullBlock = document.getElementById("switch-fb");
const switchSoftBlock = document.getElementById("switch-sb");
const switchViewVideo = document.getElementById("switch-vv");

const showMoreInput = document.getElementById("show-more-input");
const moreInfoSection = document.getElementById("info-section");


initializeActiveStatus()

if (switchActive) {
    switchActive.addEventListener('click', handleClick);
    
    if (switchFullBlock && switchSoftBlock && switchViewVideo) {
        switchFullBlock.addEventListener('click', handleClick);
        switchSoftBlock.addEventListener('click', handleClick);
        switchViewVideo.addEventListener('click', handleClick);
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

function initializeActiveStatus(){ 
    try {
        getConfigFromStorage().then(config => {
            if (config !== undefined) {
                setConfig(config);
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

function handleClick() {
    setConfig(getConfig());
    reloadTab();
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

async function getConfigFromStorage(){ 
    return  chrome.storage.local.get(["Shorts"]);
}

/* SETTERS */

 /*Change the front end, based on stored values*/
function setConfig(config){
    if(config[0] == 1){
        setActiveStatus(true);
        setSoftBlockStatus(true);
    }else{
        setActiveStatus(false);
        setFullBlockStatus(false);
        setSoftBlockStatus(false);
        setViewAsVideoStatus(false);
    }
    if(config[1] == 1){
        setFullBlockStatus(true);
        setSoftBlockStatus(true);
        setViewAsVideoStatus(false);
    }
    if(config[2] == 1){
        setSoftBlockStatus(true);
    }
    if(config[3] == 1){
        setViewAsVideoStatus(true);
        setFullBlockStatus(false);
    }
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

async function setChecked(){
    let status = getConfig();
    await chrome.storage.local.set({'Shorts': status}, function() {
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

