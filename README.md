# RecordMyDay v0.0.1

## 🌟서비스소개
<p align="center"><img src = "https://user-images.githubusercontent.com/78716842/132106130-0070f2ba-9eaf-4ffc-8503-f7e5783961e4.png" width = "250"></p> 
✍️ 나의 하루 일정에 대해 계획하고 수행 시간을 기록하고 과거의 기록들을 볼 수 있는 웹 어플리케이션 ✍️.   

<br/>
<br/>
<p align = "center">
     🛠 Tech 🛠
</p>
    

<p align = "center">
    <img src="https://img.shields.io/badge/React-v17.0.2-blue?logo=React"/></a>
     <img src="https://img.shields.io/badge/MetrialUi-v4.12.3-blue?logo=Material-UI&logoColor=blue"/></a>
    <img src="https://img.shields.io/badge/NextJs-v11.1.0-white?logo=Next.js&logoColor=white"/></a>
    <img src="https://img.shields.io/badge/Redux-v4.1.1-blueviolet?logo=Redux&logoColor=blueviolet"/></a>
    <img src="https://img.shields.io/badge/ReduxSaga-v1.1.3-violet?logo=Redux-saga&logoColor=violet"/></a>
</p>
<p align = "center">
    <img src="https://img.shields.io/badge/Express-v4.17.1-important?logo=Express&logoColor=orange"/></a>
    <img src="https://img.shields.io/badge/mysql2-v2.3.0-blue?logo=MySQL&logoColor=blue"/></a>
    <img src="https://img.shields.io/badge/Sequelize-v6.6.5-9cf?logo=Sequelize&logoColor=9cf"/></a>
    <img src="https://img.shields.io/badge/Passport-v0.4.1-green?logo=Passport&logoColor=green"/></a>
</p>

## 🌟주요기능

### 😊 메인화면
<p align = "center"><img src = "https://user-images.githubusercontent.com/78716842/132106472-c0f66ca9-3f9a-46dd-92af-ebc741a00139.png" width = "250">          <img src = "https://user-images.githubusercontent.com/78716842/132106491-7a22df7a-ea6b-41f4-86a4-03ee5b0f2024.png" width = "250"></p>  

* 메인화면은 사용자가 로그인 했을 때와, 로그인 하지 않았을 때를 나누어 나타냅니다
* 로그인 상태 여부는 Redux를 사용한 중앙저장소 main Store에 현재 로그인한 사용자의 정보가 들어있는지를 기준으로 구분합니다.    
* 메인화면 뿐만 아니라, 모든 화면이 마찬가지이지만, 화면이 로드 되기 이전에 SSR를 이용해, 현재 로그인 한 사용자의 정보를 가져오기 위해 NextJs의 getServerSideProps를 사용합니다.  

```javascript
export const getServerSideProps = wrapper.getServerSideProps((store)=>
async ({req,res}) => {
    const cookie = req ? req.headers.cookie : '';
    axios.defaults.headers.Cookie = '';
    if(req && cookie){
      axios.defaults.headers.Cookie = cookie;
    }
    store.dispatch({
      type : LOAD_MY_INFO_REQUEST,
    })
    store.dispatch(END);
    await store.sagaTask.toPromise();
  });
```

* 위 code에서 나오는 LODA_MY_INFO_REQUEST 이 화면이 로딩되기전에 서버로 부터 현재 로그인 중인 사용자의 정보를 가져오돌 하는 action입니다.
* 추가로 현재 로그인을 했는지 판단하는 방법으로 Cookie를 사용했으며, 따라서 서버에 사용자의 정보를 요청 할 때 Cookie를 같이 실어서 보냅니다.

### 👋 회원가입, 로그인
<p align="center"><img src = "https://user-images.githubusercontent.com/78716842/132122858-657b2454-0a81-4177-a3fa-37274ee687db.png" width = "200">              <img src = "https://user-images.githubusercontent.com/78716842/132122867-a6cb3fb5-6df9-475f-a0bb-71733f42952f.png" width = "250"></p>

* 회원가입의 경우에는 Database 서버를 따로 두지 않았지만, BackEnd Server에서 MySQL Database안에 사용자가 입력한 정보를 저장해놓습니다.
* RecordMyDay 자체 웹사이트에 가입을 할 수도 있으며, KaKao, FaceBook, Google OAuth2 를 통해, 소셜 회원가입 및 로그인을 할 수도 있습니다.

<p align="center"><img src = "https://user-images.githubusercontent.com/78716842/132121888-cca7a430-6626-483b-84f6-4e582f8f071e.png" width = "750"></p>
<p align="center">OAuth2 설계도 이미지 출처 - http://blogs.innovationm.com/spring-security-with-oauth2/</p>

* OAuth를 통한 회원가입 및 로그인을 그림으로 나타내면 위 그림과 같습니다.
* Resource Server (우리 서비스에서는 KaKao, Facebook, Google) 을 통해, 민감한 사용자의 정보를 관리 하지 않고, Resource Server를 통해 제공되는 사용자의 정보를 이용합니다.



### 😚 계획짜기
<p align = "center"><img src = "https://user-images.githubusercontent.com/78716842/132122093-84c9f3a7-3932-4a23-b49e-598aa2391a32.png" width = "1000"></p>

* 계획을 짜는 서비스는 총 3단계로 나뉘어져 있습니다.
* material ui의 stepper Component를 통해, 현재 사용자가 어떤 단계를 수행하고 있는지를 나타내 줍니다.

#### 1⃣  날짜 설정하기

<p align = "center"><img src = "https://user-images.githubusercontent.com/78716842/132122192-0f0b97e8-8864-4671-8749-2e55fd6f2461.png" width = "250"></p>

* 첫 단계에서는 사용자가 원하는 날짜를 선택하게 됩니다.
* 이 때 사용되는 달력은 material ui의 Date Picker Component를 이용했습니다.

#### 2⃣  계획 설정하기

<p align="center"><img src = "https://user-images.githubusercontent.com/78716842/132122318-c3d4f003-38e0-4f1e-ae73-718a2d6f3c28.png" width = "400"></p>

* 두번째 단계에서는 사용자가 선택한 날짜에 원하는 계획을 설정합니다.
* ➕ 버튼과 ➖ 버튼을 이용해 원하는 계획을 입력하는 공간을 동적으로 조정할 수 있습니다.
* 계획을 입력한 후 "등록" 버튼을 누르면 해당 계획이 BackEnd 서버에 저장되게 됩니다.
* 저장되는 계획은 처음 설정한 날짜와 hasMany 관계를 가지는 테이블에 저장되게 됩니다.
* 모든 계획이 "등록" 된 이후에는 "등록완료" 버튼을 누르면, 다음 단계로 넘어가게 됩니다.

#### 3⃣ 설정 완료

<p align="center"><img src = "https://user-images.githubusercontent.com/78716842/132122440-66440e81-c12d-4925-afc3-2ac37b04b855.png" width = "400"></p>

* 모든 설정이 완료되면, 설정 완료 페이지를 보여주고, 사용자를 메인페이지로 돌려보냅니다.


### 😁 일정확인 및 수행시간 입력

<p align = "center"><img src = "https://user-images.githubusercontent.com/78716842/132122510-498eab65-3c55-47a9-b9d2-c44685295d87.png" width = "500"></p>

* 오늘일정에 들어가면, 사용자가 이 전에 설정해둔 당일의 계획들이 다음과 같은 Component들의 배열로 보여지게 됩니다.
* 사용자는 해당 일정을 삭제할 수도 있고, 시작 시간만 설정해 제출 할 수도 있습니다.

<p align = "center"><img src = "https://user-images.githubusercontent.com/78716842/132122591-df360697-3040-497f-8cd6-7c67e21d3637.png" width = "500"></p>

* 시작 시간과 마무리 시간을 제출하게 되면, 이는 BackEnd서버의 데이터베이스에 저장됩니다.
* BackEnd 서버는 시작 시간과 마무리 시간의 차이를 통해, 수행 시간을 구하고, FrontEnd 서버로 다시 보내주게 됩니다.
* 그 후 FrontEnd 서버에서는 BackEnd 서버에서 받은 수행 시간을 화면에 표시해 줍니다.


### ⏱ 과거 기록 확인

<p align = "center"><img src = "https://user-images.githubusercontent.com/78716842/132122927-367eab83-d9f5-4380-b436-4f3b19eb9f8b.png" width = "400"></p>

* 과거 페이지에 들어가게 되면, 사용자는 자신의 계획과 수행 시간을 보고 싶은 기간을 설정할 수 있습니다.

<p align = "center"><img src = "https://user-images.githubusercontent.com/78716842/132122969-53a11b73-f0a3-4db8-b8bd-1ab5adc052e3.png" width = "400"></p>

* 보고 싶은 기간을 설정해, 제출하면, BackEnd 서버에서는 해당 기간에 포함 된 날짜들을 계획을 포함해 가져옵니다.
* 그 후, FrontEnd서버에 해당 데이터를 보내주면, FrontEnd 서버는 해당 데이터를 위 그림과 같은 컴포넌트의 배열로 화면에 보여주게 됩니다.
