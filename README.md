#제품 가격 정보 크롤러

## 요구사항
다음 5개 사이트
[digitec](https://www.interdiscount.ch/idshop/eneCategory/de/detail.jsf?&No=128&erecs_limit=0&ene_dnr=&ene_udp=true)
, [interdiscount](https://www.interdiscount.ch/idshop/eneCategory/de/detail.jsf?&No=128&erecs_limit=0&ene_dnr=&ene_udp=true)
, [melectronics](http://www.melectronics.ch/c/de/TV_%26_Audio/Fernseher/)
, [mediamarkt](https://vision.mediamarkt.ch/de/fernseher/idk7qvmngjwg)
, [conforama](http://www.conforama.ch/rayon3_high-tech_tv--video---home-cinema_televisions-led_10051_10601_-16_42073_42119_42110)
의 날짜, 시간, 가격, 세일가격(있으면), 제품명을 추출해서 각 사이트의 버튼을 누르면 데이터가 웹 페이지에 출력되게 한다.

### 개발 하는 방법
* alt + f11에서 build menu가 나온다.
* dev - 개발용 electron + server를 띄움
* server - 서버만 실행한다

## 개발 가이드
1. var 쓰지 말 것 let, const 쓸 것
2. camel case 쓸 것 ex) printHello(), getString()
3. function 호출하면 list나오게 묶을 것
<pre>

</pre>

### 실행 파일 만드는 법
<pre>
electron_build_with_react 를 실행한다.
그러면 리액트빌드, 일렉트론 빌드 둘다 한다.
</pre>

### 
<pre>
미리 설치할 라이브러리들
npm install -g react-scripts
npm install -g electron-packager

</pre>

### 크롤링 하는 방법
1.digitec
<pre>
300개 콜 한다.
</pre>

2.microsport
<pre>
https://www.brack.ch/tv-audio-foto/tv-und-homecinema/tv/tv?page=2
</pre>



3.melectronics
<pre>
http://www.melectronics.ch/view/ProductListAjaxController
위 url에 post로 아래 Parameter를 넘겨서 호출해본다
q:*
numProducts:15
navigation:/TV & Audio/Fernseher/
fromIndex:30
sort:
listview:list
ajax:true
</pre>

4.mediamarkt
<pre>
https://vision.mediamarkt.ch/de/fernseher/fernseher/idkjkp83j5u6
위 url을 콜 한다.

전체 개수를 알아낸다.
/20을 한 만큼
https://vision.mediamarkt.ch/LocalServices/Search.svc/GetMoreResults
를 request payload에서 값을  뽑는다.
</pre>

5.conforama
<pre>
</pre>

6.확인만 해볼 것
<pre>
https://www.alltron.ch/ce/tv-home-cinema/tv/tv?page=2&sortProducts
https://www.microspot.ch/de/fernseher-audio/fernseher-heimkino/fernseher--C111000/?page=2
</pre>

### api호출할 때 주의사항
react에서 express 호출할 때 localhost 쓰지 말고 127.0.0.1 쓸 것