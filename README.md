# studyVueElectron

Vue + Electron을 위한 연습 프로젝트

### 구조

electron-vue (https://simulatedgreg.gitbooks.io/electron-vue/content/ko/) 를 사용하면 보다 간편하게 일렉트론을 이용 할 수 있지만 알 수 없는 이유의 문제로 vuesax가 작동을 안함.  
따라서 Vue CLI Project (Vue 2.X + Vue-Router + Vuex + babel + Vue CLI Plugin Electron Builder) 를 이용하여 만듬.

### 사용 라이브러리 및 목적

보안 : rijndael-js, pkcs7-padding 을 이용해 AES-128-CDC 알고리즘 이용  
로컬 데이터베이스 : nedb  
컴포넌트 라이브러리 : vuesax, boxicon

### 명령어

npm run electron:build : 빌드 명령  
npm run electron:serve : 개발모드 실행 명령

### 구현

커스텀 빌드, 트레이 모드, 트레이 컨텍스트 메뉴, 커스텀 타이틀바, 로컬데이터베이스 데이터바인딩, 데이터 암호화

### 실행화면
