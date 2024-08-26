import { rightIcon } from '../icon/header/headerIcon.js';
let iconHTML = '';


rightIcon.forEach((item) => {
    iconHTML += item.icon;
    console.log(item.name);
});

const iconShow = document.querySelector('.right-header').innerHTML = iconHTML;

console.log(iconShow.innerHTML);
