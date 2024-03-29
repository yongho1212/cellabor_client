## 🚶🏻 Cellabor

<p align="center">
  
</p>
<p align="center">
인플루언서-광고주 마케팅 플랫폼입니다.
</p>
<p align="center">
원하는 조건에 맞는 인플루언서를 검색하고 협업을 제안해 보세요.
</p>

<br />

## 🌐 WEB site link

https://www.cellabor.com

<br />

## 📚 Contents

- 💡 [Motivation](#-motivation)
- 🌄 [Features](#-features)
- 🛠 [Tech Stack](#-tech-stack)
- 🎬 [Getting Started](#-getting-started)
- 📉 [Difficulties](#-difficulties)
- 📝 [Improvements](#-improvements)

<br />

## 💡 Motivation
과거 인플루언서 친구들이 DM을 통해서 협업제안이나 광고제안을 받는것을 보았습니다. 

인플루언서들이 광고할 제품을 능동적으로 찾고 광고주는 광고하고자 하는 상품에 딱 맞는 인플루언서를 찾는 플랫폼이 있으면 좋겠다고 생각하여 이 프로젝트를 기획하게 되었습니다.


<br />

## 🌄 Features

|                                                                  실행화면                                                                  |                                   내용                                    |
| :----------------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------: |
| <image width=500 height=350 src="https://user-images.githubusercontent.com/61383329/222106346-cc0ce2d3-9a8d-468b-a42f-c45136aff934.png" /> |     유튜브 api를 통해 자신의 채널을 연결할 수 있습니다.      |
| <image width=200 height=350 src="https://user-images.githubusercontent.com/61383329/222106697-6a88893d-c672-4089-a346-bdd2e6cc2ba0.png" /> |      **모바일 환경에 맞게 반응형으로 제작했습니다.      |
| <image width=500 height=350 src="https://user-images.githubusercontent.com/61383329/222106872-cc4f7adb-305a-4b3a-a028-f059dfb23df6.png" /> |        조건에 맞는 인플루언서 검색이 가능합니다.        |

<br />



## 🛠 Tech Stack

### Frontend

- React
- Redux-Toolkit
- React-Query
- Firebase Authentication

### Backend

- Node.js
- Express
- MongoDB
- Mongoose

<br />

## 🎬 Getting Started

### INF

```
id:inf@inf.com
pw:12341234

```

### AD

```
id:ad@ad.com
pw:12341234
```

<br />



## 📉 Difficulties

### 1. Role에 따른 데이터 관리

회원 role이 두가지로 나누어져있어 초반에 스키마를 작성하고 여러번 수정하는 등 시행착오가 많았습니다. 

### 2. 변경된 데이터에 대한 서버 상태관리

초기에 상태관리는 Redux를 통해서만 진행했습니다. 로그인을 하면서 웹에서 사용되는 모든 데이터를 받아와 사용했습니다. 하지만 다른 유저가 특정 데이터를 수정하면 



<br />

## 📝 Improvements


### 모듈화
개발을 진행하면서 모듈화의 필요성을 느꼈습니다. 전체적으로 모듈화를 하면서 재사용성을 높일 수 있도록 리펙토링 예정입니다.

### 클린코드
클린 코드의 중요성을 인지하지 못하고 코드를 작성하다보니 프로젝트 후반으로 가면서 유지보수에 어려움을 겪었습니다. 디렉토리구조부터 모듈을 import하는 등 리펙토링을 진행하면서 코드룰 수정할 예정입니다.



### 추가할 기능
- 현재는 계정이 유튜브에만 연결되지만 추가로 각종 SNS api인증을 통해 연결
- 현재는 인플루언서 조건 검색 기능만 있지만 상품/광고 조건 검색 기능 
- FireStore를 이용해 이미 채팅 기능을 구현했지만 ui/ux 개선 및 작은 오류등 수정

