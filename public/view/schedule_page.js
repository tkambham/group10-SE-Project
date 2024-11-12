import { currentUser } from "../controller/firebase_auth.js";
import { root } from "./elements.js";
import { protectedView } from "./protected_view.js";

export async function schedulePageView() {
    if (!currentUser) {
        root.innerHTML = await protectedView();
        return;
    }
    const response = await fetch('/view/templates/schedule_page_template.html',
        { cache: "no-store" });

    const divWrapper = document.createElement('div');
    divWrapper.innerHTML = await response.text();
    divWrapper.classList.add('m-4', 'p-4');

    divWrapper.querySelector('appointment-time').oninput = onInputAppointmentTime;
    divWrapper.querySelector('#save-appointment').onclick = onClickSaveAppointment;

    root.innerHTML = '';
    root.appendChild(divWrapper);
}