function loadScript(url, defer = true) {
    const script = document.createElement('script');
    script.src = url;
    if (defer) {
        script.defer = true;
    } else {
        script.async = true;
    }
    document.head.appendChild(script);
}

loadScript('/db/DB.js');
loadScript('/models/User.js');
loadScript('/models/Customer.js');
loadScript('/models/Order.js');
loadScript('/models/OrderDetail.js');
loadScript('/models/Item.js');
loadScript('/controllers/IndexController.js');
loadScript('/controllers/LoginController.js');
loadScript('/controllers/SignupController.js');
loadScript('/controllers/ForgotPasswordController.js');
loadScript('/controllers/HomeController.js');
loadScript('/controllers/CustomerController.js');
loadScript('/controllers/OrderController.js');
loadScript('/controllers/ItemController.js');
