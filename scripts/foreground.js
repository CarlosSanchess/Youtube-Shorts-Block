main();

function main(){
    const url = document.URL;
    if(url.includes("/results?")){
        checkOnResults();
    }else{
        handleMain();
    }
}

function checkOnResults(){
    window.addEventListener("load", function() {
        setInterval(function() {
            const elements = document.querySelectorAll('ytd-reel-shelf-renderer.ytd-item-section-renderer.style-scope');
            elements.forEach(element => {
                element.innerHTML = '';
            });
        }, 20); 
    });
}

function handleMain(){
    window.addEventListener("load", function() {
        setInterval(function() {
            const elements = document.querySelectorAll('#content > .ytd-rich-section-renderer.style-scope');
            elements.forEach(element => {
                element.innerHTML = '';
            });
        }, 20); 
    });
}

