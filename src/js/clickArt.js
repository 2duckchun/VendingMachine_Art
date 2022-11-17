


/*
1번 어떤 함수로 작성한다.
2번 .art-carousel 얘네들을 전부 쿼리셀렉터올로 딴다.
3번 nodelist로 구성 -> foreach로 내부 구성물에
click를 달아주면 일단 여기서는 끝날거같아요.

*/
const clickArt = () =>{
    const artList = document.querySelectorAll(".art-carousel")
    artList.forEach((i)=>{
        i.addEventListener("click", () => {
            alert('재사용이슈')
        })
    })
} 

export default clickArt