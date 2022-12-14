const fetchArt = async () => {
    const response = await fetch('src/js/art.json')
    let data = null
    if (response.ok) {
        data = await response.json()
    } else {
        alert(`${response.status} 에러입니다. 명화를 못가져와요 :(`)
    }


    const carousel = document.querySelector('.cont-carousel-art')
    const docFrag = document.createDocumentFragment()

    data.forEach(i => {
        const art = document.createElement('img')
        art.classList.add('art-carousel')
        art.src=`${i.파일위치}`
        art.dataset.id =`${i.id}`
        art.dataset.imgurl=`${i.파일위치}`
        art.dataset.price =`${i.가격}`
        art.dataset.location =`${i.보관위치}`
        art.dataset.year =`${i.연도}`
        art.dataset.name =`${i.이름}`
        art.dataset.artist =`${i.작가}`
        art.dataset.info = `${i.설명}`
        docFrag.appendChild(art)
    })
    carousel.appendChild(docFrag)
}

export default fetchArt