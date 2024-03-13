import {initializeApp} from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js';
import {getDatabase, ref, push, onValue} from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js';

const appSetting = {
    databaseURL: "https://basic-firebase-eb085-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSetting)
const database = getDatabase(app)

// const foodDB = ref(database, "food")
const bookDB = ref(database, "book")

onValue(bookDB, function(snapshot) {
    let booksArray = Object.values(snapshot.val());

    console.log(booksArray);
});

const addButton = document.getElementById("add-button");

addButton.addEventListener("click", function() {
    const input = document.getElementById("input-field").value;
    const shoppingList = document.getElementById("shopping-list");
    push(foodDB, input);
    addFoodtoHTML(input)
    resetInputField();
});



function addFoodtoHTML(input){
    shoppingList.innerHTML += `<li>${input}</li>`
}

function resetInputField(){
    document.getElementById("input-field").value = "";
}