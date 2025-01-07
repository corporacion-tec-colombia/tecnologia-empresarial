window.onload = function () {

    $('#onload').fadeOut();
    $('body').removeClass('no-scroll')
}



// Establece la fecha de finalización de la cuenta regresiva (puedes cambiar esta fecha)
var countdownDate = new Date("2023-12-01T00:59:59").getTime();

// Actualiza la cuenta regresiva cada segundo
var x = setInterval(function () {
    var now = new Date().getTime();
    var distance = countdownDate - now;

    // Calcula días, horas, minutos y segundos restantes
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Muestra la cuenta regresiva en el elemento con id "timer"
    document.getElementById("timer").innerHTML = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";

    // Si la cuenta regresiva ha terminado, muestra un mensaje
    if (distance < 0) {
        clearInterval(x);
        document.getElementById("timer").innerHTML = "NUEVO";
    }
}, 1000);
