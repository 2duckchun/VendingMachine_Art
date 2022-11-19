import fetchArt from "./fetchArt.js"
import renderCarouselButton from "./renderCarouselButton.js"

await fetchArt()
const carouselNodeList = document.querySelectorAll('.art-carousel')
const artNodeArray = [...carouselNodeList]
const selectedNodeArray = []
renderCarouselButton(artNodeArray)


const renderCarouselEvent = (arr) => {
    arr.forEach((e, i) => {
            e.addEventListener('click', () => {
                selectedNodeArray.push(arr.splice(i, 1))
                reRender()
            })
        })
    }

const reRender = () => {
    const carousel = document.querySelector('.cont-carousel-art')
    carousel.replaceChildren()

    artNodeArray.forEach(i => {
        carousel.appendChild(i)
        // 어짜피 새로 만들어서 뿌려줘야 할 것 같습니다.
        // 아닙니다..
        // 일단 푸쉬를 하고
        // 얻은 점.
        // 무지성으로 이벤트를 자꾸 묻히면.. 이벤트가 2~3개씩 되는거 같아요. 그래서 이벤트리스너를 삭제해주고 하던지
        // 아니면 다시 렌더링을해서 또달아주던지 이런 방법을 구상해야될거같은데
        // 여기서... 일단 민승님이랑 저랑 나눠서 프로그래밍을 해보고.... 구상해봅시다.
    })
    renderCarouselButton(artNodeArray)
    renderCarouselEvent(artNodeArray)
}


renderCarouselEvent(artNodeArray)