import fetchArt from "./fetchArt.js"
await fetchArt()

// 캐러셀 컨테이너 DOM 취득
const caroContainer = document.querySelector('.cont-carousel-art')

// 상품을 넣고 빼는 어레이로 사용
const nodeArray = Array.from(document.querySelectorAll('.art-carousel'))
const pendingArray = []


// button 기능 제작 시작
const leftBtn = document.querySelector('.btn-carousel.left')
const rightBtn = document.querySelector('.btn-carousel.right')
const artDisplay = document.querySelector('.cont-carousel-art')

// 초기 버튼 인덱스값 설정
let index = Array.from(document.querySelectorAll('.art-carousel')).length
let carouCount = 0

// 캐러셀 버튼 클릭 시 회전 기능
leftBtn.addEventListener('click', () => {
    if (carouCount === 0) return
    carouCount -= 1
    artDisplay.style.transform = `translateX(-${190 * carouCount}px)`
})
rightBtn.addEventListener('click', () => {
    if (carouCount >= index -1) {
        carouCount = -1
    }
    carouCount += 1
    artDisplay.style.transform = `translateX(-${190 * carouCount}px)`}
)
// button 기능 제작 완료


// 화면에 렌더하는 기능
const render = () => {
    caroContainer.replaceChildren()
    const docFrag = document.createDocumentFragment()
    nodeArray.forEach((e) => {
        const art = document.createElement('img')
        art.classList.add('art-carousel')
        art.src = e.dataset.imgurl
        art.dataset.id = e.dataset.id
        art.dataset.imgurl= e.dataset.imgurl
        art.dataset.price = e.dataset.price
        art.dataset.location = e.dataset.location
        art.dataset.year = e.dataset.year
        art.dataset.name = e.dataset.name
        art.dataset.artist = e.dataset.artist
        docFrag.appendChild(art)
    })
    caroContainer.appendChild(docFrag)
    
    const nodeEventNode = document.querySelectorAll('.art-carousel')
    nodeEventNode.forEach((e, i) => {
        e.addEventListener('click', () => {
            pendingArray.push(...nodeArray.splice(i, 1))
            if (carouCount === index - 1) {
                artDisplay.style.transform = `translateX(-${(190 * carouCount) - 190}px)`
                carouCount = carouCount - 1
            }
            index = index - 1
            render()
        })
    })
}

render()




