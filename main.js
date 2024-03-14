import {initializeApp} from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js';
import {getDatabase, ref, push,remove, onValue} from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js';

const appSetting = {
    databaseURL: "https://basic-firebase-eb085-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSetting)
const database = getDatabase(app)

const foodDB = ref(database, "food")
const addButton = document.getElementById("add-button");

addButton.addEventListener("click", function() {
    const input = document.getElementById("input-field").value;
    const shoppingList = document.getElementById("shopping-list");
    push(foodDB, input);
    appendItemToShoppingList(input)
    resetInputField();
});

onValue(foodDB, function(snapshot) {
    let itemsArray = Object.entries(snapshot.val());
    clearListFood();

    for (let i=0; i<itemsArray.length; i++){
        let currentItem =  itemsArray[i];
        let currentItemID = currentItem[0];
        let currentItemValue = currentItem[1];

        appendItemToShoppingList(currentItem)
    }
});

function resetInputField(){
    document.getElementById("input-field").value = "";
}

function clearListFood(){
    const shoppingList = document.getElementById("shopping-list");
    shoppingList.innerHTML = "";
}

function appendItemToShoppingList(item){
    let itemID = item[0];
    let itemValue = item[1];
    
    let newEl = document.createElement("li")
    newEl.textContent = itemValue
    const shoppingList = document.getElementById("shopping-list");
    shoppingList.appendChild(newEl)
    newEl.addEventListener("click", function() {
        let exactLocation = ref(database, `food/${itemID}`)
        remove(exactLocation);
    })
}