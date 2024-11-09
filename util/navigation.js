function showTab(value) {
    $('.show').first().addClass('hide').removeClass('show');
    $(`#tab-content-${value}`).removeClass('hide').addClass('show');
    $('.active').first().addClass('text-success').removeClass('active');
    $(`#tab-${value} a`).addClass('active').removeClass('text-success');
}

$('#signup-nav-btn').on('click', () => {
    $('.show').first().addClass('hide').removeClass('show');
    $('#signup-content').addClass('show').removeClass('hide');
    $('#burger-btn').addClass('hide');
    $('#nav-bar').addClass('hide');
    loadScript('/controllers/signup-controller.js');
});

$('#logout-nav-btn').on('click', () => {
    $('.show').first().addClass('hide').removeClass('show');
    $('#login-content').addClass('show').removeClass('hide');
    $('#burger-btn').addClass('hide');
    $('#nav-bar').addClass('hide');
    loadScript('/controllers/forgot-password-controller.js');
});