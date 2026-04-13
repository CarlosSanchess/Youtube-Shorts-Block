const ATTEMPTS = 20;
let lastUrl = location.href;

main();
const observer = new MutationObserver(debounce(() => {
    if (lastUrl !== location.href) {
        lastUrl = location.href;
        main();
    }
    runHandlers();
}, 50));

observer.observe(document.body, { childList: true, subtree: true });

function main() {
    getConfig().then(config => {
        if (!config || !config.length) return;
        window._config = config;
        runHandlers();
    });
}

function runHandlers() {
    const url = location.href;
    const config = window._config;
    if (!config) return;

    if (config[1]) handleFullBlock(url);
    if (config[2]) {
        handleResults(url);
        handleTrending(url);
        handleHome(url);
        handleVideo(url);
    }
    if (config[3]) handleView(url);
}


function handleTrending(url) {
    if (!url.includes("/trending")) return;

    document.querySelectorAll('#dismissible.ytd-video-renderer')
        .forEach(el => {
            if (el.querySelector('a[href*="shorts/"]')) {
                el.remove();
            }
        });
}

function handleResults(url) {
    if (!url.includes("/results")) return;

    document.querySelectorAll('ytd-reel-shelf-renderer, #contents > grid-shelf-view-model')
        .forEach(el => {
            if (el.querySelector('a[href*="/shorts/"]')) {
                el.remove();
            }
        });

    document.querySelectorAll('a#thumbnail[href^="/shorts/"]')
        .forEach(t => t.closest('ytd-video-renderer')?.remove());
}

function handleHome(url) {
    if (url.includes("/results") || url.includes("/trending") || url.includes("/shorts")) return;

    document.querySelectorAll('#content > .ytd-rich-section-renderer')
        .forEach(el => el.remove());
}

function handleView(url) {
    const match = url.match(/\/shorts\/([^?]+)/);
    if (!match) return;

    location.replace(`https://www.youtube.com/watch?v=${match[1]}`);
}

function handleVideo(url) {
    if (!url.includes("/watch?v=")) return;

    document.querySelectorAll('ytd-reel-shelf-renderer')
        .forEach(el => el.remove());
}

function handleFullBlock(url) {
    if (url.includes("/trending")) return;

    if (url.includes("/shorts/")) {
        window.stop();
        history.back();
        return;
    }

    document.querySelectorAll(
        'a[title="Shorts"], yt-formatted-string[title="Shorts"]'
    ).forEach(el => el.closest('a, yt-chip-cloud-chip-renderer')?.remove());
}

function debounce(fn, delay) {
    let t;
    return (...args) => {
        clearTimeout(t);
        t = setTimeout(() => fn(...args), delay);
    };
}