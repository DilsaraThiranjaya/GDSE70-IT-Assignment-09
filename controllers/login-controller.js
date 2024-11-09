$("#login-btn").on('click', () => { 
    $('.show').first().addClass('hide').removeClass('show');
    $('#tab-content-1').addClass('show').removeClass('hide');
    $('#burger-btn').removeClass('hide');
    $('#nav-bar').removeClass('hide');
    loadScript('/util/navigation.js');
    loadScript('/controllers/home-controller.js');
});

$('#signup-btn').on('click', () => {
    $('.show').first().addClass('hide').removeClass('show');
    $('#signup-content').addClass('show').removeClass('hide');
    loadScript('/controllers/signup-controller.js');
});

$('#forgot-password-btn').on('click', () => {
    $('.show').first().addClass('hide').removeClass('show');
    $('#forgot-password-content').addClass('show').removeClass('hide');
    loadScript('/controllers/forgot-password-controller.js');
});