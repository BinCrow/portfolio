//loading
let Isloader = document.querySelector(".loading");

function Isloading() {
  setTimeout(function () {
    Isloader.classList.add("active");
  }, 10000);
}
Isloading();

//loading typig text
let target = document.querySelector("#dynamic");

function randomString(){
    let stringArr = ["Getting Ready To Html", "Getting Ready to CSS", "Getting Ready to Script"];
    let selectString = stringArr[Math.floor(Math.random() * stringArr.length)];
    let selectStrinArr = selectString.split("");

    return selectStrinArr;
}

// typig reset
function resetTyping(){
    target.textContent = "";
    dynamic(randomString());
}

//한글자씩 텍스트 출력 함수
function dynamic(randomArr) {
    if(randomArr.length > 0){
        target.textContent += randomArr.shift();
        setTimeout(function(){
            dynamic(randomArr);
        },80);
    } else {
        setTimeout(resetTyping, 1000);
    }
}

dynamic(randomString());

//커서 깜박임 효과
function blink(){
    target.classList.toggle("active");
}
setInterval(blink, 500);


const tabsbtnView = document.querySelectorAll('.js_link_wrap .code_view'),
      tabscodeView = document.querySelectorAll('.sec_common .tab-box');

tabsbtnView.forEach((e, index) => {
    e.addEventListener('click', () => {
        if(!e.classList.contains('close')) {
            e.classList.add('close');
            e.innerText = 'Close'; 
            tabscodeView[index].style.display = 'block';
        } else {
            e.classList.remove('close');
            e.innerText = 'View Code'; 
            tabscodeView[index].style.display = 'none';
        }
    });
});

const tabsbtnViews = document.querySelectorAll('.front_link .code_view'),
      tabscodeViews = document.querySelectorAll('.front_common .tab-box');

tabsbtnViews.forEach((e, index) => {
    e.addEventListener('click', () => {
        if(!e.classList.contains('close')) {
            e.classList.add('close');
            e.innerText = 'Close'; 
            tabscodeViews[index].style.display = 'block';
        } else {
            e.classList.remove('close');
            e.innerText = 'View Code'; 
            tabscodeViews[index].style.display = 'none';
        }
    });
});

//버튼 active 온/오프
$('.code_view, .tab-link').click(function(){
    $('.code_view, .tab-link').not(this).removeClass('active');
    
    $(this).toggleClass('active');
});

//code tab_menu
const tabItem = document.querySelectorAll(".tab-container__item");
const tabContents = document.querySelectorAll(".content-container__content");

tabItem.forEach((item) => {
    item.addEventListener("click", tabHandler);
});
function tabHandler(item) {
    const tabTarget = item.currentTarget;
    const target = tabTarget.dataset.tab;
    tabItem.forEach((title) => {
        title.classList.remove("active");
});
tabContents.forEach((target) => {
    target.classList.remove("target");
});
    document.querySelector("#" + target).classList.add("target");
    tabTarget.classList.add("active");
}

// 메인 이펙트
function loading(){
    //메인 타이틀 문장 한개씩 분할하기
    document.querySelectorAll(".split").forEach((cut) => {
        let splitText = cut.innerText;
        let splitWrap = splitText.split("").join("</span><span aria-hidden='true'>");
        splitWrap = "<span aria-hidden='true'>" + splitWrap + "</span>";
        cut.innerHTML = splitWrap;
        cut.setAttribute("aria-label", splitText);
    });

    gsap.set("#header",{top:-100});
    gsap.set("#section1",{opacity:0});
    gsap.set("#section1 .main_wrap",{y:10, opacity:0});
    gsap.set(".split span",{y:50, opacity:0 });
    gsap.set("#section2",{y:100, opacity:0,});


    setTimeout(() => {
        const tl = gsap.timeline();
        tl.to("#header",{duration:0.5, top:0});
        tl.to("#section1",{duration:0.5, opacity:1});
        tl.to("#section1 .main_wrap",{duration:0.5, y:0, opacity:1, transition: 0.5});
        tl.to(".split span",{duration:0.5, y:0, opacity:1, stagger: 0.1});
        tl.to("#section2",{duration:0.7, opacity:1, y:0});
    },10500)
}
loading();