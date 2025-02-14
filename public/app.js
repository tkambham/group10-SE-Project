import { onClickHomeMenu, onClickScheduleMenu, onClickSignoutMenu } from './controller/menueventhandlers.js';
import { signinPageView } from './view/signin_page.js';
import { attachAuthStateChangObserver } from './controller/firebase_auth.js';
import { routing } from './controller/route_controller.js';

document.getElementById('menu-home').onclick = onClickHomeMenu;
document.getElementById('menu-schedule').onclick = onClickScheduleMenu;
document.getElementById('menu-signout').onclick = onClickSignoutMenu;

attachAuthStateChangObserver();

window.onload = function(e){
    const pathname = window.location.pathname;
    const hash = window.location.hash;
    // console.log(pathname, hash)
    routing(pathname, hash);
}

window.onpopstate = function(e){
    e.preventDefault();
    const pathname = window.location.pathname;
    const hash = window.location.hash;
    routing(pathname, hash);
}
