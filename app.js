const manifestUri = 'https://storage.googleapis.com/shaka-demo-assets/angel-one/dash.mpd';

// Debug log, when the default of INFO isn't enough:
shaka.log.setLevel(shaka.log.Level.DEBUG);

// Verbose logs, which can generate a lot of output:
// shaka.log.setLevel(shaka.log.Level.V1);

// Verbose 2, which is extremely noisy:
// shaka.log.setLevel(shaka.log.Level.V2);

function initApp() {
    shaka.polyfill.installAll();
    if (shaka.Player.isBrowserSupported()) {
        initPlayer();
    } else {
        console.error('Browser not supported!');
    }
}

function initPlayer() {
    const video = document.getElementById('video');
    const player = new shaka.Player(video);

    window.player = player;

    player.addEventListener('error', onErrorEvent);

    player.load(manifestUri).then(() => {
        console.log('The video has now been loaded!');
    }).catch(onError); 
}

function onErrorEvent(event) {
    onError(event.detail);
}

function onError(error) {
    console.error('Error code', error.code, 'object', error);
}

document.addEventListener('DOMContentLoaded', initApp);

