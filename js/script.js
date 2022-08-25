

import translation from './translation.js';


// dropDown-menu
let avatar = document.querySelector('.header__control--avatar'),
    notification = document.querySelector('.header__control--notification');

dropDownMenu(avatar);
dropDownMenu(notification);
function dropDownMenu (selector) {
    selector.addEventListener('click',() => {
        let dropDown = selector.querySelector(".dropdown__menu");
        dropDown.classList.toggle('active');
        document.querySelectorAll(".dropdown__menu").forEach((item) => {
            if(item.parentElement !== selector){
                item.parentElement.querySelector(".dropdown__menu").classList.remove('active');
            }
        });
    });
};


// side bar
let aside  = document.querySelector(".aside"),
    openBtn = document.querySelector(".fa-bars");
    openBtn.addEventListener('click',(e) => {
        aside.classList.toggle('active');
        openBtn.style.cssText = 'transform: scale(0);';
        setTimeout(() => {
            openBtn.style.cssText = 'transform: scale(1);';
        }, 100);
        
        (e.target.className == 'fa fa-bars') 
        ? e.target.className = 'fa fa-x' 
        : e.target.className = 'fa fa-bars';
    });



// toggle language
let toggleLang = document.querySelector('.toggle_lang');
toggleLang.addEventListener('change',(e) => {
    changeLang(e.target.value);
    localStorage.setItem('lang',e.target.value);
    location.reload();
});

document.addEventListener('DOMContentLoaded',() => {
    changeLang(localStorage.getItem('lang'));
});

function changeLang(selectorLang) {
    let allElements = document.querySelectorAll('[data-lang]');
    allElements.forEach((item) => {
        let key = item.getAttribute('data-lang');
        item.textContent = translation[selectorLang][key];
        if(key == 'search') {
            item.setAttribute('placeholder',translation[selectorLang][key]);
        }
    });
    document.dir = selectorLang === 'en' ? 'ltr' : "rtl";
    for(let i=0 ; i< toggleLang.options.length ; i++) {
        if(toggleLang.options[i].value == selectorLang){
            toggleLang.options[i].selected = true;
        }
    }
}

//charts
let years = [2017,2018,2019,2020,2021,2022],
    visitors = [150,400,300,450,700,1500],
    hired = [85,100,120,277,155,400];

let options = {
    chart: {
      type: 'area',
      width :"100%",
      height : "100%",
    },
    series: [
        {
            name: 'Visitors',
            data: [...visitors],
        },    
        {
            name: 'Hired',
            data: [...hired],
        },       
    ],
    xaxis: {
      categories: [...years],
    },
    colors:['#4680CA', '#0076FF'],
    
  }
  
let chart = new ApexCharts(document.querySelector("#chart"), options);
  
chart.render();