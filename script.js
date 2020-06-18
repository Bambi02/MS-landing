const rightBtn = document.querySelector(".pravy");
const leftBtn = document.querySelector(".lavy");
const img1 = document.querySelector(".img1");
const img2 = document.querySelector(".img2");
const play = document.querySelector(".fa-play");
const pause = document.querySelector(".pause1");
const images = document.querySelectorAll(".top-img");
const imagesParent = document.querySelector(".images");
const darkRight = document.querySelector(".dark-right");
const darkLeft = document.querySelector(".dark-left");
const lightRight = document.querySelector(".light-right");
const lightLeft = document.querySelector(".light-left");
const hamburgerBtn = document.querySelector(".hamburger_div");
const openHamburger = document.querySelector(".open_hamburger");
const closeHamburger = document.querySelector(".close_hamburger");
const hamburgerMenu = document.querySelector(".hamburger_menu");
const hamburgerMenuLi = document.querySelector(".hamburger_menu ul li");
const botBannerImg = document.querySelector(`.bot-banner img`);
//contains setinterfal function if autoplay is on
let autoPlay = null;
//chceks if autoplay is on
let isPlaying = true;
//starts at 1 because -100% imgs left offset
let counter = 1;
let isHamburgerOpen = false;

window.addEventListener("load", () => resizeBannersImgs())
window.addEventListener("resize", () => resizeBannersImgs())

function resizeBannersImgs(){
    if(window.innerWidth <= 765){
        images.forEach(image => image.classList.contains("lightImg") ? image.src = "./img/word_small.png" : image.src = "./img/ps_small.png");
        botBannerImg.src = `./img/outlook_small.png`
    }else if(window.innerWidth <= 1080){
        images.forEach(image => image.classList.contains("lightImg") ? image.src = "./img/word_tall.png" : image.src = "./img/ps_tall.png");
        botBannerImg.src = `./img/outlook_tall.png`
    }else{
        images.forEach(image => image.classList.contains("lightImg") ? image.src = "./img/RE37lBy.webp" : image.src = "./img/RE1Eyde.webp");
        botBannerImg.src = `./img/RE2OLdz.webp`
    }
}


hamburgerMenu.addEventListener("click", (element)=> toggleDropdownInMenu(element))

function toggleDropdownInMenu(element){

    if(element.target.lastElementChild.classList.contains("menuOpen") && element.target.lastElementChild.tagName ==="UL"){
        element.target.lastElementChild.classList = "";
        element.target.lastElementChild.previousElementSibling.style.opacity = "0";
        element.target.lastElementChild.previousElementSibling.previousElementSibling.style.opacity = "1";
    }else if(element.target.lastElementChild.tagName ==="UL"){
        element.target.lastElementChild.classList = "menuOpen";
        element.target.lastElementChild.previousElementSibling.style.opacity = "1";
        element.target.lastElementChild.previousElementSibling.previousElementSibling.style.opacity = "0";
    }
}

hamburgerBtn.addEventListener("click", () =>{
    changeHamburgerBtn();
    toggeleHamburgerMenu();
})

function changeHamburgerBtn () {
    if(!isHamburgerOpen){
        openHamburger.style.display = "none";
        closeHamburger.style.display = "block";
        isHamburgerOpen = true;
    }else{
        openHamburger.style.display = "flex";
        closeHamburger.style.display = "none";
        isHamburgerOpen = false;
    }
}

function toggeleHamburgerMenu (){
    if(!isHamburgerOpen){
        hamburgerMenu.style.display = "none";
    }else{
        hamburgerMenu.style.display = "block";
    }
}

//change positon of images on button click
//left arrow
leftBtn.addEventListener("click", () => {
    //change position of all imgs 1 position left + add transition effect
    for(let i=0; i<images.length; i++){
        images[i].style.transition = "all cubic-bezier(.16,1,.29,.99) 500ms";
        images[i].style.left = -(counter-1)*100 + "%";  
    }
    counter--;
    //prevent going past first img due to clicking faster than transitionend
    if(counter < 0) {
        for(let i=0;i<images.length;i++){
            images[i].style.transition = "none";
            images[i].style.left = "-100%";
        }
        counter = 1;
    }
    //style buttons + img description transition
    changeBtnStyle();
    descFromLeft ();
    changeSliderBckgrndColor();
    //cancel autoplay
    clearInterval(autoPlay);
})

//right arrow
rightBtn.addEventListener("click", () => {
    //change position of all imgs 1 position right + add transition effect
    for(let i=0; i<images.length; i++){
        images[i].style.transition = "all cubic-bezier(.16,1,.29,.99) 500ms";
        images[i].style.left = -(counter+1)*100 +"%";   
    }
    counter++;
    //prevent going past last img due to clicking faster than transitionend
    if(counter > 3) {
        for(let i=0;i<images.length;i++){
            images[i].style.transition = "none";
            images[i].style.left = "-100%";
        }
        counter = 1;
    }
    //style buttons + img description transition
    changeBtnStyle();
    descFromRight ();
    changeSliderBckgrndColor();
    //cancel autoplay
    clearInterval(autoPlay);
})


function changeSliderBckgrndColor() {
    const topBanner = document.querySelector(".top-banner")
    counter%2 == 0 
    ? topBanner.style.backgroundColor = "rgb(231, 231, 231)" 
    : topBanner.style.backgroundColor = "rgb(46, 46, 46)"; 
}


//bottom image nav play/pause button
document.querySelector(".play-pause").addEventListener("click", () => {
    //switch play/pause button and isplaying value
    playPauseSwitch();
    //if isplaying true, run autoplay - default on on page load
    playSlideshow(6000);
})


//infinte effect of image transitions
imagesParent.addEventListener("transitionend", () => {
    //if you are on border img turn trans. off, change position to inner img
    if(images[counter].id === "prvy-img"){
        for(let i=0;i<images.length;i++){
            images[i].style.transition = "none";
            images[i].style.left = "-200%";
        }
        counter = 2;
    }else if(images[counter].id === "posledny-img"){
        for(let i=0;i<images.length;i++){
            images[i].style.transition = "none";
            images[i].style.left = "-100%";
        }
        counter = 1;
        console.log("posledny");
    }
})


//bottom img nav (dots)
img2.addEventListener("click", () => {
    changeBottomRight();
    changeBtnStyle();
    descFromRight();
    changeSliderBckgrndColor()
});

img1.addEventListener("click", () => {
    changeBottomLeft();
    changeBtnStyle();
    descFromLeft();
    changeSliderBckgrndColor()
});


//change style of slider navi buttons based on backgroun img
changeBtnStyle = () => {
    //style on light background img
    if(counter % 2 === 0){
        bottomBtnsLight()
        sideBtnStyleLight();
        lightHover();    
    //style at dark themed background img    
    }else{
        bottomBtnsDark()
        sideBtnStyleDark();
        darkHover();
    }
}


//transition effect on image descriptions
//from right side
descFromRight = () =>{
    if(counter % 2 != 0){
        darkRight.style.transition = "ease-out transform 650ms";
        darkRight.style.opacity = "1";
        darkRight.style.transform = "translate(0, -50%)";
        lightRight.style.opacity = "0";
        lightLeft.style.opacity = "0";
        lightLeft.style.transform = "translateX(-100%)";

        imagesParent.addEventListener("transitionend", () =>{
            if (counter % 2 != 0){
                lightRight.style.transition = "ease-out all 0ms";
                lightRight.style.transform = "translateX(0%)" ;
            }
        })
    }else{
        lightRight.style.transition = "ease-out transform 650ms";
        lightRight.style.opacity = "1";
        lightRight.style.transform = "translateX(-50%)";
        darkRight.style.opacity = "0";
        darkLeft.style.opacity = "0";
        darkLeft.style.transform = "translate(-30%, -50%)" ;

        imagesParent.addEventListener("transitionend", () =>{
            if (counter % 2 === 0){
                darkRight.style.transition = "ease-out all 0ms";
                darkRight.style.transform = "translate(100%, -50%)" ;
            }
        })
    }
}

//from left side
descFromLeft = () =>{
    if(counter % 2 != 0){
        darkLeft.style.transition = "ease-out transform 500ms";
        darkLeft.style.opacity = "1";
        darkLeft.style.transform = "translate(0, -50%)";
        lightRight.style.opacity = "0";
        lightLeft.style.opacity = "0";
        lightRight.style.transform = "translateX(0%)" ;

        imagesParent.addEventListener("transitionend", () =>{
            if (counter % 2 != 0){
                lightLeft.style.transition = "ease-out all 0ms";
                lightLeft.style.transform = "translateX(-100%)" ;
            }
        })
    }else{
        lightLeft.style.transition = "ease-out transform 650ms";
        lightLeft.style.opacity = "1";
        lightLeft.style.transform = "translateX(-50%)";
        darkRight.style.opacity = "0";
        darkRight.style.transform = "translate(100%, -50%)" ;
        darkLeft.style.opacity = "0";
        darkLeft.style.display = "block";

        imagesParent.addEventListener("transitionend", () =>{
            if (counter % 2 === 0){
                darkLeft.style.transition = "ease-out all 0ms";
                darkLeft.style.transform = "translate(-30%, -50%)" ;
            }
        })
    }
}


// bottom nav img selectors (dots) - img transitions
changeBottomRight = () => {
    images.forEach((image) => {
        image.style.transition = "all cubic-bezier(.16,1,.29,.99) 700ms";
        image.style.left = "-200%";
        counter = 2;
    })
}

changeBottomLeft = () => {
    images.forEach((image) => {
        image.style.transition = "all cubic-bezier(.16,1,.29,.99) 700ms";
        image.style.left = "-100%";
        counter = 1;
    })
}


//style side buttons on mouseenter / mouseleave for dark img
darkHover = () => {
    //hover effect on 
    leftBtn.addEventListener("mouseenter", () => {
        leftBtn.style.backgroundColor = "rgb(70, 70, 70)";
        document.querySelectorAll(".top-banner button i")[0].style.color = "rgb(240, 240, 240)";
        document.querySelectorAll(".top-banner button i")[1].style.color = "rgb(240, 240, 240)";
    })
    rightBtn.addEventListener("mouseenter", () => {
        rightBtn.style.backgroundColor = "rgb(70, 70, 70)";
        document.querySelectorAll(".top-banner button i")[0].style.color = "rgb(240, 240, 240)";
        document.querySelectorAll(".top-banner button i")[1].style.color = "rgb(240, 240, 240)";
    })
    //hover effect off
    leftBtn.addEventListener("mouseleave", () => {
        sideBtnStyleDark();
    })
    rightBtn.addEventListener("mouseleave", () => {
        sideBtnStyleDark();
    })
}

//style side buttons on mouseenter / mouseleave for light img
lightHover = () => {
    //hover effect on
    leftBtn.addEventListener("mouseenter", () => {
        leftBtn.style.boxShadow = "0 4px 8px rgb(0,0,0, 0.3)";
        document.querySelectorAll(".top-banner button i")[0].style.color = "rgb(60, 60, 60)";
        document.querySelectorAll(".top-banner button i")[1].style.color = "rgb(60, 60, 60)";
        leftBtn.style.backgroundColor = "rgb(249, 249, 249)";
    })
    rightBtn.addEventListener("mouseenter", () => {
        rightBtn.style.boxShadow = "0 4px 8px rgb(0, 0, 0, 0.3)";
        rightBtn.style.backgroundColor = "rgb(249, 249, 249)";
        document.querySelectorAll(".top-banner button i")[0].style.color = "rgb(60, 60, 60)";
        document.querySelectorAll(".top-banner button i")[1].style.color = "rgb(60, 60, 60)";
    })
    //hover effect off
    leftBtn.addEventListener("mouseleave", () => {
        leftBtn.style.boxShadow = "none";
        sideBtnStyleLight();
    })
    rightBtn.addEventListener("mouseleave", () => {
        rightBtn.style.boxShadow = "none";
        sideBtnStyleLight();
    })
}

//switch play/pause button
playPauseSwitch = () => {
    if(isPlaying === true){
        play.parentElement.style.display = "flex";
        pause.parentElement.style.display = "none";
        isPlaying = false;
    }else{
        play.parentElement.style.display = "none";
        pause.parentElement.style.display = "flex";
        isPlaying = true;
    }
}

//autoplay image slides
playSlideshow = (dlzka) => {
    //initiate autoplay
    if(isPlaying == true){
        autoPlay = setInterval(function (){
            //prevent going past last img when off site due to no transitionend value
            if(counter >= 3) {
                for(let i=0;i<images.length;i++){
                    images[i].style.transition = "none";
                    images[i].style.left = "-100%";
                }
                counter = 1;
            //main autoslide logic
            }else{
            for(let i=0; i<images.length; i++){
                //add transition because of transend last img change
                images[i].style.transition = "all cubic-bezier(.16,1,.29,.99) 500ms";
                //move all images
                images[i].style.left = -(counter+1)*100 +"%";   
            }
            counter++;
            //change styling of buttons and add img description transition
            changeBtnStyle();
            descFromRight ();
            changeSliderBckgrndColor();
        }}, dlzka)
    //disables autoplay
    }else{
        clearInterval(autoPlay);
    }
}


//style side nav buddons for dark img
sideBtnStyleDark = () => {
    rightBtn.style.backgroundColor = "rgb(46, 46, 46)";
    document.querySelectorAll(".top-banner button i")[0].style.color = "rgb(240, 240, 240)";
    document.querySelectorAll(".top-banner button i")[1].style.color = "rgb(240, 240, 240)";
    leftBtn.style.backgroundColor = "rgb(46, 46, 46)";
}
//style side nav buddons for light img
sideBtnStyleLight = () => {
    rightBtn.style.backgroundColor = "rgb(249, 249, 249)";
    document.querySelectorAll(".top-banner button i")[0].style.color = "rgb(60, 60, 60)";
    document.querySelectorAll(".top-banner button i")[1].style.color = "rgb(60, 60, 60)";
    leftBtn.style.backgroundColor = "rgb(249, 249, 249)";
}


//style bottom image nav panel for dark img
bottomBtnsDark = () => {
    //bottom nav panel dots
    img1.style.border = "solid 1px white";
    img1.style.backgroundColor = "white";
    img2.style.backgroundColor = "rgba(255, 255, 255, 0)";
    img2.style.border = "solid 1px white";
    //bottom nav panel pause 
    pause.style.backgroundColor = "white";
    pause.nextElementSibling.style.backgroundColor = "white";

    play.style.color = "white";

    //hover effect on
    pause.parentElement.addEventListener("mouseenter", () => {
        pause.parentElement.style.backgroundColor = "white";
        pause.style.backgroundColor = "black"
        pause.nextElementSibling.style.backgroundColor = "black"
    })
    play.parentElement.addEventListener("mouseenter", () => {
        play.parentElement.style.backgroundColor = "white";
        play.style.color = "black"
    })

    //hover efefct off
    pause.parentElement.addEventListener("mouseleave", () => {
        pause.parentElement.style.backgroundColor = "rgba(255, 255, 255, 0)";
        pause.style.backgroundColor = "white"
        pause.nextElementSibling.style.backgroundColor = "white"
    })
    play.parentElement.addEventListener("mouseleave", () => {
        play.parentElement.style.backgroundColor = "rgba(255, 255, 255, 0)";
        play.style.color = "white"
    })
}

//style bottom image nav panel for light img
bottomBtnsLight = () => {
    //bottom nav panel dots
    img1.style.border = "solid 1px black";
    img2.style.backgroundColor = "black";
    img2.style.border = "solid 1px black";
    //bottom nav panel pause
    pause.style.backgroundColor = "black";
    pause.nextElementSibling.style.backgroundColor = "black";

    play.style.color = "black";

    //hover effect on
    pause.parentElement.addEventListener("mouseenter", () => {
        pause.parentElement.style.backgroundColor = "black";
        pause.style.backgroundColor = "white"
        pause.nextElementSibling.style.backgroundColor = "white"
    })
    //hover efefct off
    pause.parentElement.addEventListener("mouseleave", () => {
        pause.parentElement.style.backgroundColor = "rgba(255, 255, 255, 0)";
        pause.style.backgroundColor = "black"
        pause.nextElementSibling.style.backgroundColor = "black"
    })

    //hover effect on
    play.parentElement.addEventListener("mouseenter", () => {
        play.parentElement.style.backgroundColor = "black";
        play.style.color = "white"
    })
    //hover efefct off
    play.parentElement.addEventListener("mouseleave", () => {
        play.parentElement.style.backgroundColor = "rgba(255, 255, 255, 0)";
        play.style.color = "black"
    })
}