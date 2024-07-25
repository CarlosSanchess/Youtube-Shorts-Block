const ATTEMPTS = 20;
main();

let lastUrl = location.href;

const observer = new MutationObserver((mutations) => {
  mutations.forEach(() => {
    if (lastUrl !== location.href) {
      lastUrl = location.href;
      main();
    }
  });
});

const config = { subtree: true, childList: true };

observer.observe(document, config);


function main() {
    const url = document.URL;
    getConfig().then(config => {
        if (config == undefined || config == []) {
            return;
        }
        handleShorts(url, config);
    });
}

function handleShorts(url, config){
    if(!config[0]){return;}
    if(config[1]){
        handleFullBlock(url);
    }
    if(config[2]){
        handleResults(url);
        handleTrending(url);
        handleHome(url);
        handleVideo(url);
    }
    if(config[3]){
        handleView(url);
    }
}


function handleTrending(url){
    if(!url.includes("/trending?")) { return; }
    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            if (mutation.type === 'childList') {
                const elements = document.querySelectorAll('#dismissible.ytd-video-renderer.style-scope');
                no = elements.length;
                elements.forEach(element => {
                    const allAnchors = element.querySelectorAll('a');
                    if(allAnchors.length <= 0 || !allAnchors){return;}
                    allAnchors.forEach(anchor => {
                        if (anchor.getAttribute("href").includes("shorts/")) {
                            let parentElement = element.parentElement;
                            if (parentElement) {
                                while (parentElement.firstChild) {
                                    parentElement.removeChild(parentElement.firstChild);
                                }
                                parentElement.outerHTML = "";
                            }
                        }                        
                    });
                });
            }
        });
    });

    const config = { childList: true, subtree: true };

    observer.observe(document.body, config);

}


function handleResults(url){
    if(!url.includes("/results?")){return;}
    for(let i = 0; i < ATTEMPTS; i++){
        setInterval(function() {
            const elements = document.querySelectorAll('ytd-reel-shelf-renderer.ytd-item-section-renderer.style-scope');
            elements.forEach(element => {
                element.innerHTML = '';
            });
        }, 20); 
    }
}

function handleHome(url){ 
    if(url.includes("/results" || "/trending?" || "/shorts/")){return;}
    for(let i = 0; i < ATTEMPTS; i++){
        setInterval(function() {
            const elements = document.querySelectorAll('#content > .ytd-rich-section-renderer.style-scope');
            elements.forEach(element => {
                element.innerHTML = '';
            });
        }, 20); 
    }
}

function handleView(url){
    let index = url.indexOf("/shorts/");
    if(index === -1) { return; }

    let shorts_id = url.slice(index + ("/shorts/".length));
    if(shorts_id.length == 0){return;}
    
    location.replace("https://www.youtube.com/watch?v=".concat(shorts_id));
}

function handleVideo(url){
    if(!url.includes("/watch?v=")){return;}
    for(let i = 0; i < ATTEMPTS; i++){
        setInterval(function() {
            const elements = document.querySelectorAll('ytd-reel-shelf-renderer.style-scope.ytd-item-section-renderer');
            elements.forEach(element => {
                element.innerHTML = '';
            });
        }, 20); 
    }
}

function handleFullBlock(url){
    if(url.includes("/trending?")){return;}
    if(url.includes("/shorts/")){
        window.stop();
        history.back();
    }
    for(let i = 0; i < ATTEMPTS; i++){
        setInterval(function() {
            let element_mini = document.querySelector('a#endpoint.yt-simple-endpoint.style-scope.ytd-mini-guide-entry-renderer[title="Shorts"]');
            let element = document.querySelector('a#endpoint.yt-simple-endpoint.style-scope.ytd-guide-entry-renderer[title="Shorts"]');
            
            document.querySelectorAll('yt-chip-cloud-chip-renderer').forEach(chipRenderer => {
                const childElement = chipRenderer.querySelector('yt-formatted-string#text[title="Shorts"]');
                if (childElement) {
                    chipRenderer.remove();
                }
            });
            
            if(element_mini != null){
                element_mini.innerHTML = '';
                element_mini.outerHTML = '';
            }
            if(element != null){
                element.innerHTML = '';
                element.outerHTML = '';
            }            
        }, 20); 
    }
}
