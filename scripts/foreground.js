const ATTEMPTS = 20;

main();

function main() {
    const url = document.URL;
    getChecked().then(checked => {
        if (checked === false) {
            return;
        }
        handleShorts(url);
    });
}

function handleShorts(url){
    handleResults(url);
    handleTrending(url);
    handleHome(url);
    handleVideo(url);
    handleView(url);
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
    console.log(url)
    if(!url.includes("/watch?v=")){return;}
    for(let i = 0; i < ATTEMPTS; i++){
        console.log("Try to catch.");
        setInterval(function() {
            const elements = document.querySelectorAll('ytd-reel-shelf-renderer.style-scope.ytd-item-section-renderer');
            elements.forEach(element => {
                element.innerHTML = '';
            });
        }, 20); 
    }
}