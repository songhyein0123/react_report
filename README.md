# 개별과제 문제
## 1. **JSX 문법**이란 무엇일까요?
JSX란 Javascript + XML 의 약자로써 자바스크립트와 XML이 합쳐진 문법이다.
XML(eXtensible Markup Language) 은 HTML과 같은 마크업 언어이지만, HTML은 데이터를 표현하는 마크업 언어라면, XML은 데이터를 기술하는 언어이다.
예를 들어 HTML에서는 h1, p 같은 이미 만들어진 태그를 사용해야 하지만, XML은 정의된 부분을 제외하고는 사용자가 태그를 임의로 만들 수 있다.
엄밀히 말하자면 XML은 마크업 언어라기 보다 마크업 언어를 정의하기 위한 언어라고 할 수있다.

## 2. 사용자가 입력하는 값, 또는 이미 입력된 값, 메달 정보와 같은 **애플리케이션의 상태를 관리하기(추가, 변경, 삭제) 위해 리액트의 어떤 기능을 사용하셨나요**?
```
const [countries, setCountries] = useState([]);
const [country, setCountry] = useState("");
const [gold, setGold] = useState(0);
const [silver, setSilver] = useState(0);
const [bronze, setBronze] = useState(0);
```
usestate 훅을 사용했습니다. 
-> useState 훅은 함수형 컴포넌트 내에서 상태를 관리하기 위해 사용되는 리액트의 기능입니다. 이 훅을 사용하면 컴포넌트 내에서 상태를 정의하고, 해당 상태를 업데이트할 수 있는 함수를 제공받을 수 있습니다.

## 3. 애플리케이션의 **상태 값들을 컴포넌트 간 어떤 방식으로 공유하셨나요**?
현재 이 문서에는 컴포넌트 간에 공유없이 코드가 작성되었습니다.

## 4. 기능 구현을 위해 **불변성 유지가** 필요한 부분이 있었다면 하나만 설명해 주세요.
```const handleUpdateCountry = (event) => {
  event.preventDefault();

  const existingCountry = countries.find((c) => c.name === country);
  if (existingCountry) {
    const updatedCountries = countries.map((c) =>
      c.name === country
        ? {
            name: country,
            medals: { gold, silver, bronze },
          }
        : c
    );

    setCountries(updatedCountries);

    setCountry("");
    setGold(0);
    setSilver(0);
    setBronze(0);
  } else {
    alert("등록 되지 않은 국가입니다.");
  }
};
```
handleUpdateCountry 함수에서 국가 정보를 업데이트할 때 불변성을 유지하였습니다. 
여기서 불변성을 유지하는 이유는 countries 배열을 직접 수정하지 않고, 새로운 배열을 생성하여 상태를 업데이트하기 위해서입니다.
countries.map()을 사용하여 기존의 배열을 복사하고, 수정이 필요한 항목만 새로 만들어서 반환합니다. 이 과정에서 원본 배열은 수정되지 않고, 새로운 배열이 생성됩니다.
그런 다음 setCountries(updatedCountries)로 새로운 배열을 상태로 설정하였습니다.

## 5. 반복되는 컴포넌트를 파악하고 재사용할 수 있는 **컴포넌트로 분리해 보셨나요?** 그렇다면 **어떠한 이점이 있었나요?**
컴포넌트를 분리함으로써 코드재사용에 편리하며, 코드 가독성도 향상됩니다.
유지보수에도 하나하나 고치지않아도 되서 편리합니다.
