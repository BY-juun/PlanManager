# RecordMyDay v2.0.0

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
    <img src="https://img.shields.io/badge/TypeScript-v4.5.5-skyblue?logo=TypeScript&logoColor=skyblue"/></a>
    <img src="https://img.shields.io/badge/NextJs-v11.1.0-white?logo=Next.js&logoColor=white"/></a>
    <img src="https://img.shields.io/badge/ReactQuery-v3.34.17-FF4154?style=flat-square&logo=ReactQuery&logoColor=#FF4154"/></a>
    <img src="https://img.shields.io/badge/Recoil-v0.6.1-white?style=flat-square&"/></a>
</p>
<p align = "center">
    <img src="https://img.shields.io/badge/Express-v4.17.1-important?logo=Express&logoColor=orange"/></a>
    <img src="https://img.shields.io/badge/mysql2-v2.3.0-blue?logo=MySQL&logoColor=blue"/></a>
    <img src="https://img.shields.io/badge/Sequelize-v6.6.5-9cf?logo=Sequelize&logoColor=9cf"/></a>
    <img src="https://img.shields.io/badge/Passport-v0.4.1-green?logo=Passport&logoColor=green"/></a>
</p>
  
<br/>
<br
    
### ✨ V2에서는 V1에서 기술 스택 변경(JavaSciprt, Redux, ReduxSaga => TypeScript, Recoil, ReactQuery), UI 업데이트, 기존 로직 수정이 이루어졌습니다.

#### ✨ 기술 스택을 변경한 이유
* 기존 Redux store를 이용해 구현한 V1은 Redux를 이용해, 전역 상태와 데이터를 관리했습니다. 
* 그러나 실제 store에는 전역 상태와 데이터를 관리하는 코드 뿐만 아니라, 비동기 통신을 위한 부분이 상당히 많은 부분을 차지 했습니다.
* 이에 따라, 전역 Store라는 Redux가 정말 Store라는 본질에 맞게 사용되는 것인지에 대한 생각을 하게 되었습니다.

* 그 결론으로, 가장 올바른 방식으로 Store를 사용하는 방식은 Client에서 관리해야 하는 Client state만을 관리하는 방식이 올바른 방식이라는 결론을 내렸습니다.
* 그 후, Client에서 관리해야 하는 Client State와 Server에서 관리해야 하는 Server State를 나눠서 생각하게 되었고, 각각에 다른 기술을 적용해 따로 관리하게 되었습니다.
* 이에 선택된 기술이 Server State 관리에는 React Query, Client State관리에는 Recoil입니다.


## 🌟주요기능

### 😊 메인화면
<p align = "center"><img src = "https://user-images.githubusercontent.com/78716842/161422302-750bfea8-7178-419a-b4a7-a16256c6e75a.png" width = "250">          <img src = "https://user-images.githubusercontent.com/78716842/161422340-22aaac8e-3359-4b11-affb-23cb8e596f03.png" width = "250"></p>  

* 메인화면은 사용자가 로그인 했을 때와, 로그인 하지 않았을 때를 나누어 나타냅니다
* 사용자의 로그인 여부는, React Query의 useQuery hook을 이용해, 백엔드 서버로부터 사용자가 로그인을 했는지 하지 않았는지 정보를 받아와 확인합니다.    
* 메인화면 뿐만 아니라, 모든 화면에서 같은 hook을 사용해, 사용자의 로그인 유무를 체크합니다.  

```javascript
  const { data: Userdata, isLoading: getUserInfoLoading } = useUserInfoQuery();

  useEffect(() => {
    if (!getUserInfoLoading) {
      if (!Userdata) {
        alert("*로그인후 이용 가능합니다");
        router.push("/");
      }
    }
  }, [getUserInfoLoading]);
  
  export const useUserInfoQuery = () =>
  useQuery<UserInfo>("userInfo", () => getMyInfoAPI(), {
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    refetchOnMount: false,
  });
```
* useQuery의 옵션을 주어, 한번 사용자의 요청을 확인한 뒤, 백엔드 서버에 다시 요청을 보내지 않고, 첫 요청의 값을 캐싱해서 사용하도록 만들어, 백엔드 서버의 부담을 줄였습니다.

* 그렇지만, 로그인 후, 로그아웃 후에는, 유저의 정보를 가져오는 쿼리의 값을 새롭게 최신화 시켜주어야 했습니다.
* 이는 아래, 회원가입, 로그인, 로그아웃부분에 설명이 나옵니다.


### 👋 회원가입, 로그인, 로그아웃
<p align="center"><img src = "https://user-images.githubusercontent.com/78716842/161422541-ff75cda5-0d47-4841-aa01-e829066bcddb.png" width = "250">              <img src = "https://user-images.githubusercontent.com/78716842/161422564-862deada-6e36-45d9-b4c2-f41b1014809c.png" width = "250"></p>

* 회원가입의 경우에는 Database 서버를 따로 두지 않았지만, BackEnd Server에서 MySQL Database안에 사용자가 입력한 정보를 저장해놓습니다.
* RecordMyDay 자체 웹사이트에 가입을 할 수도 있으며, KaKao, Naver, Google OAuth2 를 통해, 소셜 회원가입 및 로그인을 할 수도 있습니다.

<p align="center"><img src = "https://user-images.githubusercontent.com/78716842/132121888-cca7a430-6626-483b-84f6-4e582f8f071e.png" width = "750"></p>
<p align="center">OAuth2 설계도 이미지 출처 - http://blogs.innovationm.com/spring-security-with-oauth2/</p>

* OAuth를 통한 회원가입 및 로그인을 그림으로 나타내면 위 그림과 같습니다.
* Resource Server (우리 서비스에서는 KaKao, Facebook, Google) 을 통해, 민감한 사용자의 정보를 관리 하지 않고, Resource Server를 통해 제공되는 사용자의 정보를 이용합니다.

* 로컬 로그인과 로그아웃은, React Query의 useMutation hook을 통해, 서버로 데이터를 보내게 됩니다
* 위 메인페이지에서 언급한 사용자의 정보를 가져오는 hook은 한번 caching되면, 다시 서버로 요청을 보내지 않도록 되어있습니다.
* 그렇지만, 로그인, 로그아웃의 경우에는 해당 hook의 retrun value를 변경시켜주거나, Refetch 할 수 있도록, 해당 쿼리를 Invalidate 시키는 방식을 통해, caching 된 값을 변경시켜주어야 했습니다.
* 이에 따라, useMutation의 onSuccess callback을 통해, 로그인의 경우에는 hook의 return value 변경, 로그아웃의 경우에는 쿼리 invalidation을 시켜주었습니다.

```javascript
  export const useLoginMutation = (onSuccess: (data: User) => void) => {
  const queryClient = useQueryClient();
  return useMutation(loginAPI, {
    onSuccess: (data) => {
      queryClient.setQueryData("userInfo", data);
      onSuccess(data);
    },
  });
};
  
  export const useLoginMutation = (onSuccess: (data: User) => void) => {
  const queryClient = useQueryClient();
  return useMutation(loginAPI, {
    onSuccess: (data) => {
      queryClient.setQueryData("userInfo", data);
      onSuccess(data);
    },
  });
};
```

### 😚 계획짜기
<p align = "center"><img src = "https://user-images.githubusercontent.com/78716842/132122093-84c9f3a7-3932-4a23-b49e-598aa2391a32.png" width = "1000"></p>

* 계획을 짜는 서비스는 총 3단계로 나뉘어져 있습니다.
* 각 단계는 독립된 component들로 이루어져있습니다.

```javascript
{activeStep === 날짜_설정하기 && <PickDate />}
{activeStep === 계획_설정하기 && <SettingPlan />}
{activeStep === 설정_완료 && <Complete />}
```

* 독립된 Component들에서 step(현재 어떤 단계인지를 저장)을 관리하기 위해서, props를 이용하지 않고, recoil의 atom을 통해, 전역 스토어에서 관리하고, 해당 값을 전역 스토어에서 가져올 수 있도록 해주었습니다.

```javascript
export const ActiveStep = atom({
  key: "ActiveStep",
  default: 0,
});

const setActiveStep = useSetRecoilState(ActiveStep);

const AddScheduleSuccessFunction = useCallback(() => { //성공시 다음 step으로,
    setActiveStep((prevStep) => prevStep + 1);
 }, []);
```


#### 1⃣  날짜 설정하기

<p align = "center"><img src = "https://user-images.githubusercontent.com/78716842/132122192-0f0b97e8-8864-4671-8749-2e55fd6f2461.png" width = "250"></p>

* 첫 단계에서는 사용자가 원하는 날짜를 선택하게 됩니다.
* 원하는 날짜를 선택한 후, useMutation hook을 이용해, 서버에 해당 날짜를 보내고 저장하게 됩니다.
* 이때 onSuccess 와 onFailure에 대한 callback 함수를 매게변수로 넣어, 성공과 실패에 대한 경우를 처리할 수 있도록 해주었습니다.

```javascript
  const AddScheduleSuccessFunction = useCallback(() => {
    setActiveStep((prevStep) => prevStep + 1);
  }, []);

  const AddScheduleFailureFunction = useCallback((data) => {
    if (data) {
      alert("*해당 날짜에 이미 계획이 존재합니다");
    }
    setSelectedDate(null);
  }, []);

  const addScheduleMutation = useAddScheduleMutation(AddScheduleSuccessFunction, AddScheduleFailureFunction);
```

#### 2⃣  계획 설정하기

<p align="center"><img src = "https://user-images.githubusercontent.com/78716842/132122318-c3d4f003-38e0-4f1e-ae73-718a2d6f3c28.png" width = "400"></p>

* 두번째 단계에서는 사용자가 선택한 날짜에 원하는 계획을 설정합니다.
* ➕ 버튼과 ➖ 버튼을 이용해 원하는 계획을 입력하는 공간을 동적으로 조정할 수 있습니다.
* 계획을 입력한 후 "등록" 버튼을 누르면 해당 계획이 BackEnd 서버에 저장되게 됩니다.
* 저장되는 계획은 처음 설정한 날짜와 hasMany 관계를 가지는 테이블에 저장되게 됩니다.
* 모든 계획이 "등록" 된 이후에는 "등록완료" 버튼을 누르면, 다음 단계로 넘어가게 됩니다.

<br/>

* 이때, 각 계획은 독립된 component이고, 등록이라는 버튼은 부모 component에 존재합니다. 
* 이전 버전에서는 사용자가 모든 계획을 등록하지 않더라도, 다음 단계로 넘어갈 수 있지만, V2에서는 Recoil의 전역 스토어를 이용해, 현재 제출한 계획의 개수와 ➕ 버튼을 통해, 생성한 계획 입력 공간의 개수를 비교해, 모두 입력하지 않았다면, 다음 단계로 가지 못하도록 blocking해주었습니다.

```javascript
  const completePlanFormNum = useRecoilValue(CompletePlanFormNum);
  const DayInfo = useRecoilValue(PickDateInfo);
  
  const submitPlanComplete = useCallback(() => {
  
    if (planFormNum !== completePlanFormNum) {
      alert("*아직 등록하지 않은 계획이 있습니다");
      return;
    }
    
    setActiveStep((prevStep) => prevStep + 1);
  }, [planFormNum, completePlanFormNum]);

```


#### 3⃣ 설정 완료

<p align="center"><img src = "https://user-images.githubusercontent.com/78716842/132122440-66440e81-c12d-4925-afc3-2ac37b04b855.png" width = "400"></p>

* 모든 설정이 완료되면, 설정 완료 페이지를 보여주고, 사용자를 메인페이지로 돌려보냅니다.


### 😁 일정확인 및 수행시간 입력

<p align = "center"><img src = "https://user-images.githubusercontent.com/78716842/161423294-2fa66e6f-7f24-45bc-8736-6e9e796a0c85.png" width = "250"></p>

* 오늘일정에 들어가면, 사용자가 이 전에 설정해둔 당일의 계획들이 다음과 같은 Component들의 배열로 보여지게 됩니다.
* 사용자는 해당 일정을 삭제할 수도 있고, 시작 시간만 설정해 제출 할 수도 있습니다.

<p align = "center"><img src = "https://user-images.githubusercontent.com/78716842/161423315-f1b14591-6a4c-4c9f-bf32-5916fae7ae96.png" width = "250"></p>

* 시작 시간과 마무리 시간의 제출은 useMutation hook을 이용해 처리되는데, useMutation hook의 onSuccess Callback을 통해, 처음 useQuery를 통해 가져온 계획에 대한 정보를 변경시켜줍니다.
* 삭제 역시 useMutation hook을 이용하며, onSuccess callback을 통해, 처음 가져온 데이터를 변경시켜줍니다.
* 시작 시간과 마무리 시간을 제출하게 되면, 이는 BackEnd서버의 데이터베이스에 저장됩니다.
* BackEnd 서버는 시작 시간과 마무리 시간의 차이를 통해, 수행 시간을 구하고, FrontEnd 서버로 다시 보내주게 됩니다. 해당 데이터는 onSuccess 콜백의 매게변수로 전달됩니다.
*
```javascript
 export const useSubmitPlanMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(submitTodayPlanAPI, {
    onSuccess: (_, data) => {
      queryClient.setQueryData<TodayPlan>("today", (prevData: Array<Plan>) => {
        let newData = prevData;
        const findIdx = prevData?.Plans.findIndex((plan: any) => plan?.id === data.id);
        newData.Plans[findIdx].endtime = data.endTime;
        newData.Plans[findIdx].starttime = data.startTime;
        newData.Plans[findIdx].totaltime = data.totaltime;
        return newData;
      });
    },
  });
};

export const useDeletePlanMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteTodayPlanAPI, {
    onSuccess: (response) => {
      queryClient.setQueryData<TodayPlan>("today", (prevData: Array<Plan>) => {
        let newData = prevData;
        newData.Plans = newData?.Plans?.filter((plan: any) => plan?.id !== response);
        return newData;
      });
    },
  });
};
```





### ⏱ 과거 기록 확인

<p align = "center"><img src = "https://user-images.githubusercontent.com/78716842/132122927-367eab83-d9f5-4380-b436-4f3b19eb9f8b.png" width = "250"></p>

* 과거 페이지에 들어가게 되면, 사용자는 자신의 계획과 수행 시간을 보고 싶은 기간을 설정할 수 있습니다.

<p align = "center"><img src = "https://user-images.githubusercontent.com/78716842/192108183-49e0f87b-ce6b-40a8-bc24-d0b6914fd813.png" width = "250"></p>

* 보고 싶은 기간을 설정해, 제출하면, BackEnd 서버에서는 해당 기간에 포함 된 날짜들을 계획을 포함해 가져옵니다.
* 그 후, FrontEnd서버에 해당 데이터를 보내주면, FrontEnd 서버는 해당 데이터를 위 그림과 같은 컴포넌트의 배열로 화면에 보여주게 됩니다.
* 데이터를 시각화해서 보여주기 위해, SVG를 활용해서 차트를 만들었다.
* 각 데이터의 전체에 대한 퍼센티지를 구하고, 이를 바탕으로 SVG Element 안의 Circle Element를 집어 넣는 방식으로 차트를 그려주었다.

```javascript
const makeCircle = (data: PlanListDataPercent, chartWrapperRef: React.RefObject<HTMLDivElement>) => {
  let filled = 1;
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", "100%");
  svg.setAttribute("height", "100%");
  svg.setAttribute("viewBox", "0 0 100 100");
  if (!chartWrapperRef.current) return;
  chartWrapperRef.current.innerHTML = "";
  chartWrapperRef.current.appendChild(svg);
  data.forEach((o, idx) => {
    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    const dashOffset = DASHARRAY - (DASHARRAY * o.percent) / 100;
    const angle = (filled * 360) / 100 + START_ANGLE;
    const currentDuration = (ANIMATION_DURATION * o.percent) / 100;
    const delay = (ANIMATION_DURATION * filled) / 100;
    const attributes = [
      { type: "r", value: RADIUS },
      { type: "cx", value: CX },
      { type: "cy", value: CY },
      { type: "fill", value: "transparent" },
      { type: "stroke", value: COLORS[idx] },
      { type: "stroke-width", value: STROKE_WIDTH },
      { type: "stroke-dasharray", value: DASHARRAY },
      { type: "stroke-dashoffset", value: DASHARRAY },
      { type: "transform", value: `rotate (${angle} ${CX} ${CY})` },
    ];
    attributes.forEach(({ type, value }) => {
      circle.setAttribute(type, String(value));
    });
    circle.style.transition = `stroke-dashoffset ${currentDuration}ms linear ${delay}ms`;
    svg.appendChild(circle);

    filled += o.percent;
    setTimeout(function () {
      circle.style.strokeDashoffset = String(dashOffset);
    }, 100);
  });
};
```


### V3에서 하고 싶은 것?
* V3에서도 V2와 마찬가지로 새로운 기술을 적용해보고 싶습니다. (ex, React v18)
* V1에 비해 V2에는 새롭게 추가된 기능은 없기 때문에, V3에서는 새로운 기능(ex, 일기, 운동 일지 등등)을 넣어보고 싶습니다.
* V3에서는 Aws Amplify를 통한 배포를 경험해 보고, Aws Amplify를 통한 CICD를 구축해보고 싶습니다.
