window.onload = function () {

    $('#onload').fadeOut();
}


window.addEventListener('load', function () {
    const carouselItems = document.querySelectorAll('.carousel-item');
    const randomIndex = Math.floor(Math.random() * carouselItems.length);
    carouselItems.forEach((item, index) => {
        if (index === randomIndex) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
});



document.querySelector("#__next > main > div.col-span-4.flex.items-center.justify-center.overflow-hidden.rounded-2xl.bg-pink-200.dark\\:border-pink-500.dark\\:bg-pink-500\\/20.dark\\:shadow-none.dark\\:backdrop-blur-2xl.md\\:col-span-4.md\\:h-52 > div")