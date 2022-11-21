import fetchArt from "./fetchArt.js"
await fetchArt()

// DOM 취득
const caroContainer = document.querySelector('.cont-carousel-art')
const pendingUl = document.querySelector('.ul-cart.balance')
const buyBtn = document.querySelector('.btn-buy')
const getUl = document.querySelector('.ul-cart.myart')

// 상품을 넣고 빼는 어레이로 사용
const nodeArray = Array.from(document.querySelectorAll('.art-carousel'))
const pendingArray = []
const getArray = []
const myartArray = []

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
    
    const eventNode = document.querySelectorAll('.art-carousel')
    eventNode.forEach((e, i) => {
        e.addEventListener('click', () => {
            pendingArray.push(...nodeArray.splice(i, 1))
            if (carouCount === index - 1) {
                artDisplay.style.transform = `translateX(-${(190 * carouCount) - 190}px)`
                carouCount = carouCount - 1
            }
            index = index - 1
            
            pendingRender()
            render()
        })
    })
}

const pendingRender = () => {
    pendingUl.replaceChildren()
    const docFrag = document.createDocumentFragment()
    pendingArray.forEach((e) => {
        const art = document.createElement('li')
        art.classList.add('li-cart')
        art.classList.add('balance')
        art.innerHTML = `
        <img src="${e.dataset.imgurl}" alt="${e.dataset.name}">
        <span>${e.dataset.name}</span>
        `
        docFrag.appendChild(art)
    })
    pendingUl.appendChild(docFrag)

    const eventNode = document.querySelectorAll('.li-cart.balance')
    eventNode.forEach((e, i) => {
        e.addEventListener('click', () => {
            nodeArray.push(...pendingArray.splice(i, 1))
            index = index + 1
            console.log(nodeArray);
            console.log(pendingArray);
            render()
            pendingRender()
        })
    })
}

buyBtn.addEventListener('click', () => {
    if (pendingArray.length === 0) {
        alert("아직 선택한 작품이 없습니다.")
        return
    }
    getUl.replaceChildren()

    getArray.push(...pendingArray.splice(0))
    pendingRender()
    myartArray.push(...getArray.splice(0))

    const docFrag = document.createDocumentFragment()
    myartArray.forEach((e) => {
        const art = document.createElement('li')
        art.classList.add('li-cart')
        art.classList.add('myart')
        art.innerHTML = `
        <img src="${e.dataset.imgurl}" alt="${e.dataset.name}">
        <span>${e.dataset.name}</span>
        `
        art.dataset.imgurl = e.dataset.imgurl
        art.dataset.id = e.dataset.id
        art.dataset.price = e.dataset.price
        art.dataset.location = e.dataset.location
        art.dataset.year = e.dataset.year
        art.dataset.name = e.dataset.name
        art.dataset.artist = e.dataset.artist
        art.dataset.info = e.dataset.info
        docFrag.appendChild(art)
    })
    getUl.appendChild(docFrag)

    const eventNode = document.querySelectorAll('.li-cart.myart')
    console.log(eventNode);

    eventNode.forEach((e) => {
        e.addEventListener('click', () => {
            console.dir(e.dataset.imgurl)
        })
    })
})


render()




