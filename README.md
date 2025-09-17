# make Web

- 비트 코인과 같은 코인들의 정보 api로 웹 만들어 보기 (2025/09)

- 참고 : 노마드 코더

<hr/>

# 버그 발생

- 맥을 처음 구매하고 만든 프로젝트라, 윈도우와 달리 많은 버그가 있었습니다.

- 다음에 이런 버그들이 나왔을 때에 참고하기 위해 만들었습니다.

<hr/>

# 임시 지식 저장소

- 프로젝트를 만들면서 알아간점 또는 느낀점 또한 정리했습니다.

<hr/>

## 9/12

```sh

sh: vite: command not found

```

- 해당 버그는 리액트를 처음 빌드시 나온 에러입니다.

- 이유는 vite가 전역으로 설치되지 않았기 때문에 에러가 생겼습니다.

- 해결방법

```sh

npm install -g vite

```

- 해당 명령어 입력 후 정상작동을 확인했습니다.

<hr/>

## 9/13

- emmet이 typescript 환경에서 사용되지 않았습니다.

- 해당 오류는 vs code 에디터의 설정 문제임을 확인했습니다.

- 아래는 해결 방법을 정리했습니다.

<방법 1>

1. vs code 에디터 안에서 command + shift + p를 누른뒤
2. Preferences: Open User Settings(JSON)
3. 아래의 코드를 추가합니다.

```json

"emmet.inclueLanguages": {
  "javascript" : "javascriptreact",
  "typescript" : "typescriptreact"
},

```

<방법 2>

1. vs code 에디터 안에서 command + ,를 눌러 세팅을 열어줍니다.
2. 검색창에 emmet: include Languages를 검색합니다.
3. 해당 설정에 **항목추가**를 눌러 줍니다.
4. 키와 값에 아래의 값을 추가합니다.

```json
         key : value
"javascript" : "javascriptreact",
"typescript" : "typescriptreact"

```

## **tips**

- div + tap 눌렀을때 div 태그가 아닌 다른게 완성이 될시
  1. cmd + ,
  2. tab completion 입력
  3. Editor : Tab Completion 항목 찾기
  4. "on"으로 되어 있는 옵션을 "off" 또는 "onlySnippets"로 바꾸기

<hr/>

# 9/15

- **CORS** 아래와 같은 에러가 발생했습니다.

```sh

Access to fetch at 'https://api.coinpaprika.com/v1/tickers/' from origin 'http://localhost:5173' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.

```

- 해당 오류는 브라우저에서 다른 도메인(API)로 fetch를 요청 했을 경우에
  서버 측에서 허용하지 않을경우 생기는 에러입니다.

- 해당 코드를 윈도우에서 빌드했을때는 CORS 오류가 생기지 않았습니다.(원인 불명)

- CORS 에러를 고치기 위해서는 여러 방법이 존재하지만, 저는 배포를 하지않기 때문에 편의성을 고려해 크롬 확장 프로그램을 사용하였습니다.

**Chrome Extensions**

- 웹 브라우저에 확장 프로그램을 설치하여 유용한 기능을 제공하는 역활입니다.

- 저는 그 중에 **Allow CORS: Access-Control-Allow-Origin**라는 확장 프로그램을 사용했습니다.

- 해당 확장 프로그램은 간단한 온오프로 CORS를 우회하게 도와줍니다.

**설치링크**

- 해당 링크에서 다운을 받습니다 : [Allow CORS: Access-Control-Allow-Origin](https://chromewebstore.google.com/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf)

**사용방법**

1. 크롬 브라우저의 오른쪽위 퍼즐 모양을 클릭
2. 다운받은 확장 프로그램을 실행시킵니다.
3. 프로그램의 왼쪽 중하단쪽 **togle ON|OFF** ON을 눌러주면 끝

<hr/>

# 9/16

**타입스크립트에서 JSON 데이터를 불러왔을때의 타입?**

- 타입스크립트를 쓰는 사람은 알다시피 타입을 지정하지 않으면 **암시적 any 타입**이 된걸 확인했습니다.

- 그렇다면 JSON의 데이터를 불러왔을때 타입을 정해주지 않았을때 어떻게 될지 생각을 해보았습니다.

<hr/>

## **조건**

1. data라는 변수에 JSON의 데이터를 담았다고 가정합니다.
2. JSON의 데이터는 아래와 같습니다.

```json
{
  "id": "id",
  "pw": "pw"
}
```

<hr/>

## **가정**

1. 타입을 하나만 정의했을 경우

```typescript
  type Data {
    id : string;
  }
```

- data 변수에 저장된 id의 값을 문제없이 사용가능 했습니다.

- 하지만 pw의 값은 불러올수 없음을 확인했습니다.

2. 타입을 지정하지 않았을 경우

- 이 또한 가정1과 다를거 없이 정상적으로 빌드가 되었습니다.

- 마찬가지로 id, pw의 값을 사용하지 못했습니다.

## **결론**

- JSON으로 받는 데이터들은 타입을 정의하지않아도 저장이 가능합니다.

- 하지만 해당 값들을 사용하기 위해서는 해당 값과 같은 키와 밸류를 타입으로 만들어야 합니다.

- 이와 같이 타입을 정의하지않고 JSON 데이터를 받을 수 있는 이유는 **타입스크립트는 정적 타입 검사를 하는 언어**이기 때문입니다.
  코드 작성이 아닌 런타임에는 javascript로 컴파일 되기때문에 실제 타입 검사를 스킵한다고 합니다.

<hr/>

**리액트 빌드시 useEffect로 useState값 넣기(초깃값)**

- 프로젝트를 만들면서 초기 화면을 어떻게 구성할지 생각을 하던중 JSON의 데이터를 받아서 첫번째 index의 값을 넣으면 된다고 생각이 들어 코드로 옮겼습니다.

```typescript
useEffect(() => {
  ...

  // select > option안에서 해당 string 내용으로 세팅
  searchBit("Bitcoin");
},[]);
```

- 이와 같이 코드를 작성시 브라우저에 값이 정상적으로 출력되지 않는다는것을 알았습니다. 이유는 처음 빌드시 JSON 데이터를 호출하고 값을 저장하는 과정에서 "coins"는 빈 배열인 상태입니다. 해당 상태에서 searchBit()가 실행하게 되어 브라우저의 초기 UI에 아무것도 나타나지 않은것입니다.

<hr />

# 해결 방법

-

## 1. 또 다른 useEffect를 만들어서 처리

```typescript
useEffect(() => {
  if (!loading) {
    searchBit("Bitcoin");
  }
}, [loading]);
```

- 해당 코드는 JSON 데이터를 모두 받으면 loading의 값이 false값이 되는걸 생각하고 만든 코드입니다.

- 나름 깔끔하게 처리했다고 생각했지만, "useEffect"를 한번 더 써야한다는 점과 코드칸을 차지 한다는 점이 마음에 걸렸습니다.
