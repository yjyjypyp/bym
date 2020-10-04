(function () {

  const stageElem = document.querySelector('.stage');
  const houseElem = document.querySelector('.house');
  const barElem = document.querySelector('.progress-bar'); //아래 const barElem => progress-bar 관련 변수 선언
  const mousePos = { x: 0, y:0 }; //마우스가 움직일 때마다 화면이 따라 움직이도록하기 위해, 우선 마우스 위치의 수치값을 가운데를 0(원)으로 만들어주기 위한 변수 설정
  let maxScrollValue;

  function resizeHandler() {
    maxScrollValue = document.body.offsetHeight - window.innerHeight;
  }


  window.addEventListener('scroll', function () {
    const scrollPer = pageYOffset / maxScrollValue;
    const zMove = scrollPer * 1000 - 1500;
    /*
    아래 주석에 자세한 설명 써있음. 얼마나 스크롤 됐는지 비율로 나타낸 것임.
    1000을 곱한 이유 :
    다 내려야 수치가 1임. 범위가 0부터 1까지 인 것. 너무 작은 단위라 1000을 곱해줘서 보기 좋게 표현한 것 뿐.
    이렇게 하면 수치가 0부터 1000이겠지.

    -490 을 한 이유:
    style.css에서 house에 translateZ 에 -490을 설정했는데,
    const zMove = pageYOffset / maxScrollValue * 1000
    이렇게 쓰면 수치가 0에서 시작되는거니까,
    화면을 켰을 대 수치가 -490인 상태였다가(이미지가 멀리 떨어져있다가)
    스크롤을 하는 순간 0이 되서 갑자기 이미지가 앞에 딱 하고 오는 것임. 그러니 여기서도 -490 수치를 해준 것!
    */
    houseElem.style.transform = 'translateZ(' + zMove + 'vw)';
    /*
    console.log(pageYOffset);
    얼마나 스크롤 됐는지 수치 콘솔창에서 볼 수 있도록 함
    스크롤 해서 나온 마지막 위치 값은 스크롤의 길이는 뺀 수치겠지!
    스크롤이 0에서 시작하니까
    => 문서 전체 높이(body의 높이)에서 스크롤바 만큼의 길이를 빼줘야
    스크롤을 다 내렸을 때 콘솔에 출력되는 수치 = 스크롤 되는 수치 겠지
    */

    /*
    console.log(maxScrollValue);
    => 전체 문서 높이 - 창 높이를 출력한 것.
    괄호 안에 선언해줘도 되지만, 위에 변수 let maxScrollValue 를 아예 추가해줘서 이걸 출력한 것임.

    얼마나 스크롤 됐는지 비율로 나타내고 싶다면
    console.log(pageYOffset / maxScrollValue); 해서 나눠주면 됨!
    */

    //progress bar이 스크롤 할 때 그 값에 맞춰 진행되도록 하는 함수
    barElem.style.width = scrollPer * 100 + '%';

  });

  window.addEventListener('mousemove', function (e) {
    mousePos.x = -1 + (e.clientX / window.innerWidth) * 2; //여기서 (e.clientX, e.clientY)는 마우스의 위치를 수치값으로 나타내주는 것.
    mousePos.y = 1 - (e.clientY / window.innerHeight) * 2;
    //여기까지 선언하면, 콘솔창에 출력해서 확인해보면 화면에서 마우스가 제일 왼쪽으로 가면 값이 -1, 가운데로 가면 0, 오른쪽으로 가면 1이 되게 출력됨)
    // 이 계산식은 매우 자주 씀!!! 엄청 이해가 잘 되진 않아도 일단 자주 쓰니 복사해서 쓰면 됨!
    // 마우스 위치가 원점을 기준으로 왼-오 / 위-아래가 +1/-1로 작용한다는 개념만 알고 있으면 됨!
    // 이제 이거를 회전 시키면, 마우스에 따라 화면이 움직이도록 할 수 있겠지!
    // 벽을 포함하는 하우스랑(인강에서는 캐릭터까지)을 아우르고 있는 class를 회전시키면 되겠지! => stage 회전!
    // => 자바스크립트 맨 위에 변수 선언해준 곳들에 stage도 가져와서 변수로 선언해준 뒤 이용하면 되겠지!
    stageElem.style.transform = 'rotateX(' + (mousePos.y * 1.5) + 'deg) rotateY(' + (mousePos.x * 1.5) + 'deg)';
    // x축을 기준으로 움직인다는 건, y포지션 값을 받는다는거지! x값들을 잇고 있는 라인을 기준으로 돈다는거니까!
    // y축을 기준으로 움직인다는 건, x포지션 값을 받는다는거겠지.
  });

  window.addEventListener('resize', resizeHandler);
  resizeHandler();
  /*화면 사이즈를 바꿨을 때, 스크롤 되는 정도가 달라짐
  이유 : height에 맞춰져 있어서, 처음 설정한 height 값일 때만
  내가 코딩해놓은대로 작동하는 것
  => 사이즈가 바뀔 때마다 갱신해주는 코드를 적어야함.
  이렇게 resizeHandler을 만들어놓고, 위에 function으로 기능 추가해줌!

  이 resize 이벤트는 다른 페이지를 만들 때에도 많이 쓰이는 기능이니까 많이 쓰임!!!
  스마트폰만 해도 가로로 돌렸다가 하기도 하니!

  &
  위에
  let maxScrollValue = document.body.offsetHeight - window.innerHeight;
  를 적어줬었는데, 그냥 전체를 다 다시 갱신해야 때도 있으니
  그냥 위에서는 선언만 해주고, 여기서 초기화 해주기
  */

})();
