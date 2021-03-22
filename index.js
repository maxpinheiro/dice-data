function changeTheme() {
    if ($('#theme-btn').html() === "Dark") {
        lightTheme();
    } else {
        darkTheme();
    }
}

function darkTheme() {
    $('#theme-btn').html("Dark");
    $('body').removeClass('bg-light text-dark').addClass('bg-dark text-lighter');
    $('a').removeClass('text-dark').addClass('text-lighter');
    $('#theme-btn').removeClass('btn-outline-dark').addClass('btn-outline-secondary');
}

function lightTheme() {
    $('#theme-btn').html("Light");
    $('body').removeClass('bg-dark text-lighter').addClass('bg-light text-dark');
    $('a').removeClass('text-lighter').addClass('text-dark');
    $('#theme-btn').removeClass('btn-outline-secondary').addClass('btn-outline-dark');
}