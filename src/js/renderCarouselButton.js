const renderCarouselButton = (arr) => {
    const leftBtn = document.querySelector('.btn-carousel.left')
    const rightBtn = document.querySelector('.btn-carousel.right')
    const artDisplay = document.querySelector('.cont-carousel-art')
    // let index = document.querySelectorAll('.art-carousel')
    let index = arr.length

    let carouselNumber = 0
    console.log(index);

    leftBtn.addEventListener('click', () => {
        console.log('왼쪽클릭됨')
        if (carouselNumber === 0) return
        carouselNumber -= 1
        artDisplay.style.transform = `translateX(-${190*carouselNumber}px)`
    })

    rightBtn.addEventListener('click', () => {
        if (carouselNumber === index -1) {
            carouselNumber = -1
        }
        carouselNumber += 1
        artDisplay.style.transform = `translateX(-${190*carouselNumber}px)`}
    )
}

export default renderCarouselButton