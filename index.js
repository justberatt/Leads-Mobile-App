import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js";

const firebaseConfig = {
    databaseURL: config.DATABASE_URL,
    projectId: "leads-tracker-app-df200"
}

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const refereceInDB = ref(database, "leads");

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

deleteBtn.addEventListener("dblclick", function() {

})

inputBtn.addEventListener("click", function() {
    push(refereceInDB, inputEl.value)
    inputEl.value = ""   
})