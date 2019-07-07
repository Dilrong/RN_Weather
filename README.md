# Blog_Post

## 개요
* **목적**

본 문서는 RN_Weather 프로젝트의 구조를 문서화하여 차후 프로젝트 유지보수를 위해 작성되었습니다.

* **Getting Start**
```
npm install
npm start
```
본 프로젝트는 React-Native CLI 기반으로 제작되었습니다.

추가된 주요 사용 라이브러리는 axios, mobx, react-navigation, realm 입니다.

자세한 dependencies 및 scripts는 package.json을 참고해주시면 됩니다.

## 유의사항

- ios 기준으로 테스트를 한 상태로 안드로이드에서 오류가 발생할 수 있습니다.

- 코드에 주석을 넣는 것은 코드의 가독성을 해친다고 생각하여 주석은 넣지 않는 스타일입니다.

- 로컬 DB로 realm를 사용하였습니다.

## File Structure
```
src
 - api
 - screen
 - store
 App.js
```

### Screen

* **HomeScreen**
    * 홈화면으로 날씨를 받아서 보여주는 화면

### Store

* **WeatherStore**
    * MobX store로 전역 상태 관리를 위함

## Version History

  Date | Version | author
  ------ | ------ | ------
  2019.07.06 | <center> v0.1 </center> | 이학성