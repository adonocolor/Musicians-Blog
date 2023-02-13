//  Swiper object initialization
const swiper = new Swiper('.swiper-container', {
    // Slide looping
    loop:"true",
    // Previewing only one slide per moment
    slidesPerView: 1,

    // Инициализация кнопок навигации Nav Buttons Initialization
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});