import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js";

const firebaseConfig = {
    databaseURL: 'https://leads-tracker-app-df200-default-rtdb.europe-west1.firebasedatabase.app',
}

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const referenceInDB = ref(database, "leads");

const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")

function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems
}

onValue(referenceInDB, function(snapshot) {
    //we check if the snapshot contains data because whenever we delete data from a particular reference, 
    // the snapshot returned with the onValue() function will have no data but it will to render something 
    // because it assumes there is data. So first we check and if there is data, then and only then we allow
    // the function to run.
    const snapshotDoesExist = snapshot.exists();
    if (snapshotDoesExist) {
        const snapshotVAlues = snapshot.val();
        const leads = Object.values(snapshotVAlues);
        render(leads);
    }
})

deleteBtn.addEventListener("dblclick", function() {
    remove(referenceInDB);
    ulEl.innerHTML = "";
})

inputBtn.addEventListener("click", function() {
    push(referenceInDB, inputEl.value)
    inputEl.value = ""   
})