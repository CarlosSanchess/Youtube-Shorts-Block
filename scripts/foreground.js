const ATTEMPTS = 100;
main();

function main() {
    const url = document.URL;
    getChecked().then(checked => {
        if (checked === false) {
            return;
        }
        if (url.includes("/results?")) {
            checkOnResults();
        } else {
            handleMain();
        }
    });
}

function checkOnResults(){
    for(let i = 0; i < ATTEMPTS; i++){
    setInterval(function() {
        const elements = document.querySelectorAll('ytd-reel-shelf-renderer.ytd-item-section-renderer.style-scope');
        elements.forEach(element => {
            element.innerHTML = '';
        });
    }, 20); 
}
}

function handleMain(){
        for(let i = 0; i < ATTEMPTS; i++){
            setInterval(function() {
                const elements = document.querySelectorAll('#content > .ytd-rich-section-renderer.style-scope');
                elements.forEach(element => {
                    element.innerHTML = '';
                });
            }, 20); 
        }

}

