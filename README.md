# VendingMachine_Art

🖼️ 배포 페이지 : https://2duckchun.github.io/VendingMachine_Art/

<img width="50%" src="https://user-images.githubusercontent.com/96304623/208017860-4a977473-f552-4943-9f02-5406c5bb8536.png"/>

## 개요
* 아트밴딩머신은 자판기로 미술품을 구매할 수 있게 만든 미니프로젝트 입니다.
* 미술작품을 캐러셀로 구경할 수 있고, 구매 시 그림에 대한 상세한 설명을 모달창으로 볼 수 있습니다.
* 멋쟁이사자처럼 프론트엔드 3기 페어 프로그래밍으로 진행했습니다.

## 팀원
* FE 김태수 <a href="https://github.com/2duckchun">🔗 Github</a>
* FE 김민승 <a href="https://github.com/rosamondkim">🔗 Github</a>

## 개발 툴 
* HTML / Sass / Vanilia JS

## 프로젝트 목표
* 떠오르는 아이디어를 프로그래밍을 통해 구현해보고자 했습니다.(기존 과제였던 자판기에서 주요 틀을 제외한 모든 구조에 변화를 주었습니다.)
* 페어프로그래밍 경험을 쌓아보고자 했습니다
* 자바스크립트의 기본기를 다지고, Sass 활용을 위해 프로젝트를 진행했습니다.

## 명세
* 비동기 통신을 통해 명화 데이터 API를 request하여 캐러셀 뷰어에 렌더링
* 캐러셀 디스플레이를 클릭하면 해당 화면에 존재하는 명화 취득
* 취득한 명화에 마우스를 올리면 해당하는 그림의 가격과 간단한 설명을 볼 수 있음.
* 명화 취득 후 획득 버튼을 누르면 계산 과정을 거친 후 별도의 UI에서 모달창으로 명화의 정보를 볼 수 확인할 수 있게 함.
* 잔액이 부족하다면 명화를 취득하더라도 구매가 불가능함.
* 소지금을 아트머신에 잔액으로 입금 가능함.
* 이미 선택된 그림은 캐러셀 리스트에서 제거되고, 취득을 취소한다면 캐러셀 리스트에 다시 복귀함
 
## 메인 기능
|캐러셀 기능|선택 취소 기능|
|:---:|:---:|
|<img width="80%" src="https://user-images.githubusercontent.com/96304623/208023216-b5081a89-a594-4d4a-a539-b9fc2f4cf65c.gif"/>|<img width="80%" src="https://user-images.githubusercontent.com/96304623/208024102-a1cbe166-0aad-4f02-88b3-846958a6eb5b.gif"/>|

|계산 기능|구매 후 모달 기능|
|:---:|:---:|
|<img width="80%" src="https://user-images.githubusercontent.com/96304623/208025624-3f57c070-9649-4e45-9850-0718cba1bc87.gif"/>|<img width="80%" src="https://user-images.githubusercontent.com/96304623/208023486-582a01c7-37fe-40db-8fcf-7f209afdcc29.gif"/>|


## 이슈
1.event target이 원치 않는 엘리먼트에 적용되는 이슈 발생
  - 문제점: 모달창 구현 시 li요소에 dataset으로 데이터를 저장해놓고, li를 클릭 시 모달에 dataset이 전달되게 로직을 구성했으나 자식요소인 img,span의 클릭 빈도가 더 높다는 것을 인식했습니다.
  - 해결: 이벤트 버블링에 `event.target.closet('요소')` 메서드를 접목하여 li의 자식요소를 클릭하더라도 li의 dataset에 접근할 수 있도록 수정했습니다.
2. 요소에 이벤트를 부여한 뒤 재사용할 경우, 이벤트가 중첩되는 이슈 발생
  - 문제점: 명화를 구매하고 취소할 때 요소를 재사용하는 방향으로 초기 명세를 설정했습니다.
  - 해결: 배열 자료구조를 도입해서 데이터가 변동될때마다 배열 템플릿을 저장한 뒤, 템플릿에 따라 요소를 재렌더링 했습니다.
3. 페어프로그래밍 초기에 협업툴이 익숙하지 않아 개발이 지연되는 이슈 발생
  - 문제: 협업 툴인 liveshare를 활용했으나, 활용방식을 잘못 이해하여 각각 다른 파일을 수정하고 저장하면 동기화 오류가 나는 것을 도중에 인지했습니다.
  - 해결: 협업툴의 사용 방법을 다시 공부하고 용도에 맞게 페어프로그래밍으로 진행하여 같은 이슈가 발생하지 않도록 했습니다.

## 프로젝트를 하며 느낀점/개선방향
1. 코드리뷰를 받고나서 효율적인 코드 작성 방법에 대해 생각하게 되었습니다.
  - 전역변수는 메노리 점유문제 및 클린코드 개념에서 올바른 방향이 아니라는것을 인지하게 되었습니다.
  - 이벤트핸들러 함수를 익명함수로 사용하는 것이 코드 가독성 측면에서 좋지 않다는 것을 직접 코딩해보며 알게 되었습니다.
  - 프로그래밍을 시작하기 전에 코드 분리 등 명확한 설계가 있어야 헤메지 않는다는 것을 체감했습니다.
2. 반응형 웹을 도입하기 위한 접근방향에 대해 생각하게 되었습니다.
  - 초기 설계에서 웹사이트 구축 후에 반응형으로 수정하고자 했으나, Html, css에 구조적 결함이 있다는 것을 알게되었습니다.
  - UX 디자인을 할 때 적용되는 Mobile first의 개념을 반응형 도입 실패를 통해 깨달았습니다.
  

