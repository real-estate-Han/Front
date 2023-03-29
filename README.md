# (실제 사용을 위한) 한세일 부동산

> ### 🌼 소개
>
> ### 파주시 문산읍 기준으로 토지,공장,상가, 주택 부동산을 운영하고 좀더 접근성을 높이기 위한 페이지
>
> #### 🏠[HomePage](https://han-estate.vercel.app/) &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

<br>

<center>
<p align='center'>
<!-- <img width='100%' src='https://user-images.githubusercontent.com/117061219/221060189-76c2b66b-0b75-4170-afc1-fb895d3bb42a.jpg'> -->
</p>

<div>
<img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=Next.js&logoColor=white">
<img src="https://img.shields.io/badge/TypeScripts-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white">
<img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white">
  <img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=Express&logoColor=white">
  <img src="https://img.shields.io/badge/Emotion-pink?style=for-the-badge&logo=&logoColor=white">
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=MongoDB&logoColor=white">
  <img src="https://img.shields.io/badge/Zustand-blue?style=for-the-badge&logo=Zustand&logoColor=white">
  <img src="https://img.shields.io/badge/Apollo GraphQL-311C87?style=for-the-badge&logo=Apollo GraphQL&logoColor=white">
    <!-- <img src="https://img.shields.io/badge/ReactQuery-311C87?style=for-the-badge&logo=React Query&logoColor=white"> -->
      <img src="https://img.shields.io/badge/Amazon S3-569A31?style=for-the-badge&logo=Amazon S3&logoColor=white">
        <img src="https://img.shields.io/badge/kakao map API-FFCD00?style=for-the-badge&logo=kakaotalk&logoColor=white">
  <img src="https://img.shields.io/badge/eslint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white">
   <img src="https://img.shields.io/badge/prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=white">
    <img src="https://img.shields.io/badge/jest-C21325?style=for-the-badge&logo=jest&logoColor=white">
     <img src="https://img.shields.io/badge/Testing Library-E33332?style=for-the-badge&logo=Testing Library&logoColor=white">
      <img src="https://img.shields.io/badge/React Hook Form-EC5990?style=for-the-badge&logo=React Hook Form&logoColor=white">

 </div>
</center>

---

## 🌼 개발 기간

- 2023.03.01. ~ 진행중

<br>

## 🌼 팀원 구성 (총 1명)

- Front-end : 이태권
- Back-end : 이태권

<br>

## 🌼 프로젝트 기술 스택

- 프레임워크 / 언어
  - NextJS
  - TypeScript
- 라이브러리
  - react-kakao-maps-sdk
  - apollo/client + server (graphql로 서버통신을 위해 사용)
  - aws-sdk/client-s3 (s3에 파일을 올리기 위한 라이브러리)
  - aws-sdk/s3-request-presigner(s3에 먼저 빈파일 자리를 만들고 그 데이터가 들어갈 url을 받아 fetch를 통해 파일을 넣을 수 있게 해주는 라이브러리)
  - Emotion/styled
  - browser-image-compression (이미지 압축하여 s3 공간 절약)
  - sweetalert2
  - zustand (클라이언트 상태관리를 위한 라이브러리)
  - react-hook-form (수많은 input을 관리 하기 위한 라이브러리)

---

## 🌼 프로젝트 아키텍처

## <img width='100%' src='https://velog.velcdn.com/images/momoco-git/post/a5019fe0-9ec8-4acb-abad-6c7f8de9dc7f/image.png'>

## 🌼 주요기능

현재 구현된 기능

1. 지도 (kakao Map)

- 매물 위치 마커로 표시 맵 레벨 상승시 클러스터로 분류
- 맵 경계 변화에 따른 경계 안의 좌표만 자료 필터링

2. 매물 등록

- 메인 이미지와 상세 이미지 선택 시 미리보기 매물 등록시 S3에 저장 후 url 반환하여 서버에 저장
- 지도 클릭 또는 도로명 주소 검색으로 좌표 및 주소 반환
- react-hook-form으로 많은 input 값 객체로 반환하고 에러 메세지 관리
- 탭기능으로 매물 종류에 따른 input창 변화

3. 디테일 모달

- 해당 매물에 대한 상세자료를 볼 수 있는 모달창
- 매물 삭제시 S3에 있는 사진 자료도 같이 삭제

미구현 기능 (우선순위)

1. CSS 색상 통일 밑 추가 작성
2. 방문자 로그인 없이 매물 찜하여 매물 찾기
   - 로그인 기능 없이 구현 하기 위해 localStorage를 통해 구현 예정
3. 매물 수정 기능
   - 매물 수정 할 수 있도록 기존 모달창 이용하여 구현예정
4. SEO
   - meta 태크 및 아이콘 제작
5. 배포 후 클라이언트 피드백

6. 관리자 페이지
   - googleAnalystic 연동하여 방문자 확인
   - 등록한 매물 관리
7. 상세 필터링 기능
8. 모바일 화면에 맞는 반응형으로 변경

---

<!-- ## 🌼 주요 페이지

|       <h4>페이지</h4>        |                                                                   <h4>사진</h4>                                                                   |       <h4>페이지</h4>        |                                                                  <h4>사진</h4>                                                                   |
| :--------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------------------: | :--------------------------: | :----------------------------------------------------------------------------------------------------------------------------------------------: |
|     <h4>랜딩 페이지</h4>     | <img width="1000" alt="landingpage" src="https://user-images.githubusercontent.com/117061219/223122746-5707defc-80de-4795-8d99-5bb1944faa13.png"> |     <h4>메인 페이지</h4>     |  <img width="277" alt="mainpage" src="https://user-images.githubusercontent.com/117061219/222664358-7b23e86e-f17b-4886-997c-139159a6251a.png">   |
|     <h4>검색 페이지</h4>     | <img width="277" alt="selectResult" src="https://user-images.githubusercontent.com/117061219/222664666-361feccb-9dff-4b84-a630-0ce2cd965a57.png"> | <h4>상세검색결과 페이지</h4> | <img width="277" alt="placeDetail" src="https://user-images.githubusercontent.com/117061219/223122755-e6aafb98-579f-42bf-aa28-8538e9d23efc.png"> |
|     <h4>상세 페이지</h4>     | <img width="1000" alt="detailPage" src="https://user-images.githubusercontent.com/117061219/222664790-8c0ce881-4bf4-45c8-baec-9d0e66f14b76.png">  |  <h4>상세 페이지 수정</h4>   | <img width="277" alt="placeDetail" src="https://user-images.githubusercontent.com/117061219/222664380-7d20dd5b-0516-405a-87df-82494f5d603a.png"> |
|     <h4>지도 페이지</h4>     |     <img width="1000" alt="map" src="https://user-images.githubusercontent.com/117061219/222666805-59f9c77d-aa50-4002-92c8-1b6e220a4746.png">     |     <h4>마이 페이지</h4>     |   <img width="1000" alt="mypage" src="https://user-images.githubusercontent.com/117061219/222666856-0b22f517-2101-461d-93d0-d59811551b0c.png">   |
|    <h4>팔로잉 페이지</h4>    |  <img width="1000" alt="following" src="https://user-images.githubusercontent.com/117061219/222667195-7a150b6b-78a5-41cd-80ae-af5af992203b.png">  |        <h4>쪽지</h4>         | <img width="277" alt="sendmessage" src="https://user-images.githubusercontent.com/117061219/222665864-6c41140f-3372-4157-aa30-540a4d631aa0.png"> |
| <h4>회원정보수정 페이지</h4> | <img width="1000" alt="mypageedit" src="https://user-images.githubusercontent.com/117061219/223122764-fa962f79-788e-429e-94d7-9cd5c39c9cbc.png">  |    <h4>로그인 페이지</h4>    | <img width="1000" alt="loginpage" src="https://user-images.githubusercontent.com/117061219/222666871-c74a3218-c582-449b-b731-8e700b5816b9.png">  | -->
