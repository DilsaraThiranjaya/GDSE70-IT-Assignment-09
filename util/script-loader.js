function loadScript(url) {
    const script = document.createElement('script');
    script.src = url;
    script.async = true;
    document.head.appendChild(script);
}

loadScript('/db/database.js');
loadScript('/controllers/login-controller.js');


