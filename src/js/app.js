import fetchArt from "./fetchArt.js"
await fetchArt()

// 전체적인 DOM 취득
const caroContainer = document.querySelector('.cont-carousel-art')
const pendingUl = document.querySelector('.ul-cart.balance')
const buyBtn = document.querySelector('.btn-buy')
const getUl = document.querySelector('.ul-cart.myart')

const cartInfo = document.querySelector('.cont-cart-info')
const cartTitle = document.querySelector('.tit-cart-info')
const cartArtist = document.querySelector('.artist-cart-info')
const cartPrice = document.querySelector('.price-cart-info')

const balance = document.querySelector('.txt-balance') // 잔액
const myMoney = document.querySelector('.txt-mymoney') // 소지금
const inputCost = document.querySelector('.inp-put')   // 입금액 입력
const putButton = document.querySelector('.btn-put')   // 입금버튼
const getButton = document.querySelector('.btn-buy') // 구매버튼
const returnButton = document.querySelector('.btn-return') // 거스름돈반환버튼
// 전체적인 DOM 취득


// 모달 관련 기능
const modalOverlay = document.querySelector('.cont-modal-overlay')

modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
        modalOverlay.style.display = 'none'
    }
})
const modalMain = document.querySelector('.cont-modal-main')
const modalImage = document.querySelector('.img-modal')
const modalTitle = document.querySelector('.tit-modal')
const modalArtist = document.querySelector('.artist-modal')
const modalYear = document.querySelector('.year-modal')
const modalInfo = document.querySelector('.info-modal')
const modalLocation = document.querySelector('.location-modal')

// 구매한 미술품을 클릭을 했을때 일어나는 동작을 정의한 함수
const handleClick = (e) => {
    if(!e.target.closest("li")) {
        return 
    }
    const artInfo = e.target.closest("li").dataset;
    setModal(artInfo);
}
// 이벤트 등록
getUl.addEventListener('click', handleClick)

// 모달 관련 기능
const setModal = (dataset) =>{
    modalImage.src = dataset.imgurl
    modalTitle.textContent = dataset.name
    modalArtist.textContent = dataset.artist
    modalYear.textContent = dataset.year
    modalInfo.textContent = dataset.info
    modalLocation.textContent = '보관장소 : ' + dataset.location
    modalOverlay.style.display = 'flex'
}


// 상품을 넣고 빼는 어레이로 사용
const nodeArray = Array.from(document.querySelectorAll('.art-carousel'))
const pendingArray = []
const getArray = []
const myartArray = []
// 상품을 넣고 빼는 어레이로 사용


// button 기능
const leftBtn = document.querySelector('.btn-carousel.left')
const rightBtn = document.querySelector('.btn-carousel.right')
const artDisplay = document.querySelector('.cont-carousel-art')
// button 기능 - 초기 버튼 인덱스값 설정
let index = Array.from(document.querySelectorAll('.art-carousel')).length
let carouCount = 0
// button 기능 - 캐러셀 버튼 클릭 시 회전 기능
leftBtn.addEventListener('click', () => {
    if (carouCount === 0) {
        carouCount = index
    }
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
// button 기능


// 캐러셀 렌더 기능
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
// 캐러셀 렌더 기능


// 구매 대기 렌더 기능
const pendingRender = () => {
    pendingUl.replaceChildren()
    const docFrag = document.createDocumentFragment()
    pendingArray.forEach((e) => {
        const art = document.createElement('li')
        art.classList.add('li-cart')
        art.classList.add('balance')
        art.dataset.id = e.dataset.id
        art.dataset.imgurl= e.dataset.imgurl
        art.dataset.price = e.dataset.price
        art.dataset.location = e.dataset.location
        art.dataset.year = e.dataset.year
        art.dataset.name = e.dataset.name
        art.dataset.artist = e.dataset.artist
        art.innerHTML = `
        <img src="${e.dataset.imgurl}" alt="${e.dataset.name}">
        <span>${e.dataset.name}</span>
        `
        docFrag.appendChild(art)
    })
    pendingUl.appendChild(docFrag)

    const eventNode = document.querySelectorAll('.li-cart.balance')
    eventNode.forEach((e, i) => {
        e.addEventListener('click', (e) => {
            cartInfo.style.display = 'none'
            console.log(e.target.dataset)
            nodeArray.push(...pendingArray.splice(i, 1))
            index = index + 1
            render()
            pendingRender()
        })
        e.addEventListener('mousemove', (e) => {
            const artInfo = e.target.closest("li").dataset
            cartTitle.textContent = artInfo.name
            cartArtist.textContent = artInfo.artist
            cartPrice.textContent = new Intl.NumberFormat().format(artInfo.price) + ' 원'
            cartInfo.style.display = 'flex';
            cartInfo.style.left = e.clientX + 'px'
            cartInfo.style.top = e.clientY + 'px'
        })
        e.addEventListener('mouseleave', (e) => {
            cartInfo.style.display = 'none'
        })
    })
}
// 구매 대기 렌더 기능


/*

구매버튼을 눌렀을 경우(이벤트)
내부 img 요소들을 쿼리셀렉터올로 딴다.
그리고 내부에 dataset은 객체로 저장이 되니,
reduce를 이용해서 e.datatset.price로 접근을 하고
가격을 누산한다.

그리고 나온 누산값을 잔액과 비교해서
잔액보다 크다면
넌 못사 라고 띄워주고 그냥 리턴해버린다.

만약 누산값보다 잔액이 클경우 

*/


// 구매 기능
buyBtn.addEventListener('click', () => {
    if (pendingArray.length === 0) {
        alert("아직 선택한 작품이 없습니다.")
        return
    }
    const nowBalance = parseInt(balance.textContent.replaceAll(',', ''))
    const cartArray = document.querySelectorAll('.li-cart.balance') 
    const cartPrice = [...cartArray].reduce((acc, e) => {
        acc = acc + parseInt(e.dataset.price)
        return acc
    }, 0)
    if (cartPrice > nowBalance) {
        alert('잔액이 부족합니다.')
        return
    }
    balance.textContent = new Intl.NumberFormat().format(nowBalance - cartPrice) + ' 원';
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
    eventNode.forEach((e) => {
        e.addEventListener('click', () => {
            console.dir(e.dataset.imgurl)
        })
    })
})
// 구매 기능



// 입금기능
putButton.addEventListener('click', (e) => {
    const nowInputCost = parseInt(inputCost.value);
    const nowMyMoney = parseInt(myMoney.textContent.replaceAll(',', ''));
    const nowBalance = parseInt(balance.textContent.replaceAll(',', ''));

    if (nowInputCost) {
        if (nowInputCost <= nowMyMoney && nowInputCost > 0) {
            myMoney.textContent = new Intl.NumberFormat().format(nowMyMoney - nowInputCost) + ' 원';
            balance.textContent = new Intl.NumberFormat().format((nowBalance ? nowBalance : 0) + nowInputCost) + ' 원'
        } else if (nowInputCost <= 0) {
            alert("장난합니까 휴먼")
        } else {
            alert("소지금이 부족합니다.")
        }
        inputCost.value = null
    }
})
// 입금기능


// 거스름돈 반환기능

// const balance = document.querySelector('.txt-balance') // 잔액
// const myMoney = document.querySelector('.txt-mymoney') // 소지금
// const inputCost = document.querySelector('.inp-put')   // 입금액 입력
// const putButton = document.querySelector('.btn-put')   // 입금버튼
// const getButton = document.querySelector('.btn-buy') // 구매버튼
// const returnButton = document.querySelector('.btn-return') // 거스름돈반환기능

returnButton.addEventListener('click', (e) => {
    const nowBalance = parseInt(balance.textContent.replaceAll(',', ''))
    const nowMyMoney = parseInt(myMoney.textContent.replaceAll(',', ''))
    if (nowBalance) {
        myMoney.textContent = new Intl.NumberFormat().format(nowBalance + nowMyMoney) + ' 원';
        balance.textContent = '0원';
    } else {
        alert('잔액이 없습니다!')
    }
})
// 거스름돈 반환기능

//const btnsCola = this.itemList.querySelectorAll('button');

// 자판기 구매 기능

// btnsCola.forEach((item) => {
//     item.addEventListener('click', (event) => {
//         const targetEl = event.currentTarget;
//         const balanceVal = parseInt(this.balance.textContent.replaceAll(',', ''));
//         let isStaged = false; // 이미 선택되었는가?
//         const targetElPrice = parseInt(targetEl.dataset.price);
//         const stagedListItem = this.stagedList.querySelectorAll('li');

//         // 입금된 금액이 음료수 값보다 많거나 같을 경우
//         if (balanceVal >= targetElPrice) {
//             this.balance.textContent = new Intl.NumberFormat().format(balanceVal - targetElPrice) + ' 원';


//             // forEach 문을 사용할 경우 반복의 종료가 불가능하다(return, break 작동 안함). 모든 원소를 순환할 필요가 없다면 비효율적.
//             for (const item of stagedListItem) {  // 클릭한 음료수가 내가 이미 선택한 아이템인지 탐색
//                 if (item.dataset.item === targetEl.dataset.item) { //내가 클릭한 상품과 내가 담은 상품이 같을 경우
//                     item.querySelector('.num-counter').textContent++;
//                     isStaged = true;
//                     break;
//                 }
//             };

//             // 해당 아이템을 처음 선택했을 경우
//             if (!isStaged) {
//                 this.stagedItemGenerator(targetEl);
//             }

//             // 콜라의 갯수를 줄입니다.
//             targetEl.dataset.count--;

//             if (parseInt(targetEl.dataset.count) === 0) { // 상품이 소진되면 품절 표시
//                 targetEl.parentElement.classList.add('sold-out');
//                 const warning = document.createElement('em');
//                 warning.textContent = '해당상품은 품절입니다.';
//                 warning.classList.add('ir');
//                 // em 요소를 button 요소의 앞에 배치합니다.
//                 targetEl.parentElement.insertBefore(warning, targetEl);
//             }

//         } else {
//             alert("잔액이 부족합니다. 돈을 입금해주세요");
//         }
//     })
// })






// 자판기 구매 기능



render()