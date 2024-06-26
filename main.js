const $=document.querySelector.bind(document);
const $$=document.querySelectorAll.bind(document);

const btnModalClose=document.getElementById('icon-modal');
const btnModalOpen=document.getElementById('show-modal');
const modalEl=$('.modal');
const listSlider=$('.slider__img');
const sliderImgs=$$('.slider__img img');
const sliderBtnLeft=document.getElementById('prve');
const sliderBtnRight=document.getElementById('next');
const dotsSliders=$$('.slider__dot span');
const cateList=$('.category__list');
const cateItems=$$('.category__item');
const cateBtns=$$('.category__bnt .item');
const productSaleList=$$('.product-sale__list');
const productSaleItmes=$$('.product-sale__item');
const dayEl=document.getElementById('day');
const hourEl=document.getElementById('hour');
const minuteEl=document.getElementById('minute');
const secondEl=document.getElementById('second');
const modalOption=$('.option-product-modal');
const btnCloseModaloption=$('.option-product-modal-icon');
const btnProducts=$$(' .btn-product');
const feedbackContent=$('.feddback-content');
const btnFeedback=$$('.feddback-btn i');
const feedbackContentItems=$$('.feddback-content-item');
const listBrand=$('.list-brand');
const itemsBrand=$$('.list-brand .item');
function handleModal(){
    btnModalClose.onclick=function(){
        modalEl.style.display="none";
    }
    btnModalOpen.onclick=function(){
        modalEl.style.display="block";
        
    
    }
}
function handleModalOption(){
    btnCloseModaloption.onclick=function(){
        modalOption.style.display="none";
    }
    btnProducts.forEach(function(btn){
        btn.onclick=function(){
            modalOption.style.display="flex";
        }
    });
}
function handleSlider() {
    let active = 0;
    let widthEl = listSlider.offsetWidth;
    let l = sliderImgs.length - 1;

    sliderBtnRight.onclick = function () {
        if(active +1>l){
            active=0;
        }
        else{
            active+=1;
        }
        showSlider();
    }
    sliderBtnLeft.onclick = function () {
        if(active-1<0){
            active=l;
        }
        else{
            active-=1;
        }
        showSlider();
    }

    function showSlider() {
        let valueEl = -widthEl * active;
        listSlider.style.transform = `translateX(${valueEl}px)`;
        DotSlider();
        
    }
    function DotSlider(){
        let lastActiveDot=$('.slider__dot span.active'); // lấy dot đang được active
        lastActiveDot.classList.remove("active");    
        dotsSliders[active].classList.add("active");
    }
    dotsSliders.forEach((dot,index) =>{
        dot.addEventListener("click" , function(){
            active=index;
            showSlider();
        })
    })
    setInterval(function(){
        sliderBtnRight.click();
    },7000);
}


function feddback(){
    let isDragging=false;
    function dragging(e) {
        if(!isDragging){
            return;
        }
        feedbackContent.scrollLeft -=e.movementX;
    }
    function mouseDown(){
        isDragging=true;
    }
    function mouseUp(){
        isDragging=false;
    }
    feedbackContent.addEventListener("mousemove",dragging);
    feedbackContent.addEventListener("mousedown",mouseDown);
    feedbackContent.addEventListener("mouseup",mouseUp);
}

function coutnDown(){
    const timeSale='1 january 2025 ';
    const currentDate=new Date();
    const timeCountDown=new Date(timeSale);
    const totalSecon=(timeCountDown -currentDate)/1000;
    let days=Math.floor(totalSecon/3600/24);
    let hours=Math.floor(totalSecon/3600)%24;
    let minutes=Math.floor(totalSecon/60)%60 ;
    let seconds=Math.floor(totalSecon)%60;

    dayEl.innerHTML=formatDate(days)
    hourEl.innerHTML=formatDate(hours)
    minuteEl.innerHTML=formatDate(minutes)
    secondEl.innerHTML=formatDate(seconds)

    function formatDate(time){
        if(time<10){
            return `0${time}`
        }
        else{
            return time;
        }
    }

    setInterval (coutnDown,1000);
}
function handleDragging(el){
    cateBtns.forEach(function(btn){
        btn.addEventListener("click",function(){
            if(btn.id=="btn-next"){
                cateList.scrollLeft+=350;
            }
            else{
                cateList.scrollLeft-=350;

            }
        })
    })
    let isDragging=false;
    function dragging(e){
        if(!isDragging){
            return ;
        }
        cateList.classList.add("dragging")
        el.scrollLeft-=e.movementX;

    }
    function mouseDragging(){
        return isDragging=true;
    }
    function mouseStop(){
        cateList.classList.remove("dragging")
        return isDragging=false;

    }
    el.addEventListener("mousemove", dragging);
    el.addEventListener("mousedown", mouseDragging);
    el.addEventListener("mouseup", mouseStop);
}
function handleDraggingProduct(){
    productSaleList.forEach(function(productList){
        let isDragging=false;
        function dragging(e){
            if(!isDragging){
                return ;
            }
            productList.scrollLeft-=e.movementX;

        }
        function mouseUp(){
            return isDragging=false;
        }
        function mouseDown(){
            return isDragging=true;
        }
        productList.addEventListener("mousemove", dragging);
        productList.addEventListener("mouseup", mouseUp);
        productList.addEventListener("mousedown", mouseDown);
    })
}
function start(){
    handleModal();
    handleSlider();
    coutnDown();
    handleModalOption();
    feddback();
    handleDragging(listBrand);
    handleDragging(cateList);
    handleDraggingProduct();
}
start();