import { DEV } from "../model/constants.js";
import { deleteAppointment, getAppointmentList } from "./firestore_controller.js";
import { buildAppointmentCard } from "../view/home_page.js";
import { currentUser } from "./firebase_auth.js";
import { onEditAppointment } from "./manage_conroller.js";

export async function renderAppointmentList(email){
    let appointmentList;
    try{
        appointmentList = await getAppointmentList(email);
    }
    catch(e){
        if(DEV) console.log('Failes to the appointment list', e);
        alert('Failed to load the appointment list', JSON.stringify(e));
        return;
    }
    const container =  document.getElementById('appointments-body');
    container.innerHTML = '';
    if(appointmentList.length === 0){
        container.innerHTML = 'No appointments found';
        return;
    }
    appointmentList.forEach(appointment => {
        container.appendChild(buildAppointmentCard(appointment));
    });
}

export function onClickEditAppointment(e){
    const appointmentId = e.target.parentElement.id;
    const appointmentName = e.target.parentElement.querySelector('.card-title').innerText;
    const appointmentDate = e.target.parentElement.querySelector('.card-subtitle').innerText.split(' ')[0];
    const appointmentTime = e.target.parentElement.querySelector('.card-subtitle').innerText.split(' ')[1];
    const appointmentNotes = e.target.parentElement.querySelector('.card-text').innerText;
    const appointmentType = e.target.parentElement.querySelectorAll('.card-text')[1].innerText;
    const earlyRemainder = e.target.parentElement.querySelectorAll('.card-text')[2].innerText;

    let data = {
        appointmentId,
        appointmentName,
        appointmentDate,
        appointmentTime,
        appointmentNotes,
        appointmentType,
        earlyRemainder,
    };

    onEditAppointment(data);

}

export async function onClickDeleteAppointment(e){
    if(!confirm('Are you sure you want to delete this appointment?')){
        return;
    }
    try{
        await deleteAppointment(currentUser.email, e.target.parentElement.id);
        renderAppointmentList(currentUser.email);
    }
    catch(error){
        if(DEV) console.error('Failed to delete the appointment', error);
        alert('Failed to delete the appointment', JSON.stringify(error));
    }
}