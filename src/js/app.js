const leftBtn = document.querySelector('.btn-carousel.left')
const rightBtn = document.querySelector('.btn-carousel.right')
const artDisplay = document.querySelector('.cont-carousel-art')

let index = 0

leftBtn.addEventListener('click', () => {
    if (index === 0) return
    index -= 1
    artDisplay.style.transform = `translateX(-${190*index}px)`
})

rightBtn.addEventListener('click', () => {
    if (index === 2) {
        index = -1
    }
    index += 1
    artDisplay.style.transform = `translateX(-${190*index}px)`})

/*
디스플레이는 디스플레이대로 뿌리되
모든 그림을 렌더할때는 별도의 class와 이벤트를 달고 나오게끔 먼저 설계할 필요성 있음.
렌더하는 js를 어떻게 설계할 것인가??
(요즘 머리가 잘 안돌아간다...)
*/