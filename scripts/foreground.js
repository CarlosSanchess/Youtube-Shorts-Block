const ATTEMPTS = 20;
//See if there is non ending loop in the other set itnerval.
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
    if(url.includes("/results" || "/trending?")){return;}
    for(let i = 0; i < ATTEMPTS; i++){
        setInterval(function() {
            const elements = document.querySelectorAll('#content > .ytd-rich-section-renderer.style-scope');
            elements.forEach(element => {
                element.innerHTML = '';
            });
        }, 20); 
    }
}

