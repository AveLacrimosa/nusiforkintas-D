// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDevFWIWrHZARh4mvOgqenywFz4188TiqE",
  authDomain: "productmanagement-3cad0.firebaseapp.com",
  databaseURL: "https://productmanagement-3cad0-default-rtdb.firebaseio.com",
  projectId: "productmanagement-3cad0",
  storageBucket: "productmanagement-3cad0.appspot.com",
  messagingSenderId: "505976784113",
  appId: "1:505976784113:web:4469afd6b59d37e5441550",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

import {
  getDatabase,
  ref,
  get,
  set,
  child,
  update,
  remove,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js";

const db = getDatabase();

let enterID = document.getElementById("enterID");
let enterName = document.getElementById("enterName");
let enterQuantity = document.getElementById("enterQuantity");
let findID = document.getElementById("findID");
let findData = document.getElementById("findData");
let enterPrice = document.getElementById("enterPrice");
let enterDesc = document.getElementById("enterDesc");
let enterImg = document.getElementById("enterImg");

let insertBtn = document.getElementById("insert");
let updateBtn = document.getElementById("update");
let removeBtn = document.getElementById("remove");
let findBtn = document.getElementById("find");

function insertData(evt) {
  evt.preventDefault();
  console.log(
    enterID.value,
    enterName.value,
    enterQuantity.value,
    enterPrice.value,
    enterDesc.value
  );

  if (enterID.value.length < 3 || enterID.value == "") {
    alert("ivedei per mazai skaitmenu");
    return;
  }
  if (enterName.value == "") {
    alert("nieko neivedei");
    return;
  }

  if (enterQuantity.value == "") {
    alert("nieko neivedei :D");
    return;
  }

  set(ref(db, "Products/" + enterID.value), {
    Name: enterName.value,
    ID: enterID.value,
    Quantity: enterQuantity.value,
    Price: enterPrice.value,
    Description: enterDesc.value,
    Img: enterImg.value,
  })
    .then(() => {
      alert("Data added successfully");
    })
    .catch((error) => {
      alert(error);
    });
}

insertBtn.addEventListener("click", insertData);

function FindData(evt) {
  evt.preventDefault();
  console.log(`select function ${enterID.value}`);
  const dbref = ref(db);

  get(child(dbref, "Products/" + findID.value)).then((snapshot) => {
    if (snapshot.exists()) {
      //First
      let tableRow = document.createElement('tr')
      let listItem = document.createElement("td");
    //   listItem.classList.add("list-group-item", "list-group-item-secondary");
      listItem.textContent = "Product Name: " + snapshot.val().Name;
      tableRow.appendChild(listItem);
    //   findData.appendChild(listItem)

      //Second
      let listItemSecond = document.createElement("td");
    //   listItemSecond.classList.add("list-group-item", "list-group-item-light");
      listItemSecond.textContent =
        "Product Quantity: " + snapshot.val().Quantity;
      tableRow.appendChild(listItemSecond);
      // third
      let listItemThird = document.createElement("td");
      listItemThird.classList.add(
        "list-group-item",
        "list-group-item-secondary"
      );
      listItemThird.textContent = "Product Price: " + snapshot.val().Price;
      tableRow.appendChild(listItemThird);
      
      // fourth
      let listItemFourth = document.createElement("td");
      listItemFourth.classList.add("list-group-item", "list-group-item-light");
      listItemFourth.textContent =  "Product Description: " + snapshot.val().Description;
      tableRow.appendChild(listItemFourth);

      //Img
      let listImg = document.createElement("img");
      listImg.src = snapshot.val().Img;
      findData.appendChild(listImg);
      findData.appendChild(tableRow)
    } else {
      alert("data does not exist");
    }
  });
}

findBtn.addEventListener("click", FindData);

function updateData(evt) {
  evt.preventDefault();
  console.log(
    `update function ${enterID.value} ${enterName.value} ${enterQuantity.value}`
  );
  update(ref(db, "Products/" + enterID.value), {
    Name: enterName.value,
    Quantity: enterQuantity.value,
  })
    .then(() => {
      alert("Data updated successfully");
    })
    .catch((error) => {
      alert(error);
    });
}

updateBtn.addEventListener("click", updateData);

function removeData(evt) {
  evt.preventDefault();
  console.log(`remove function ${enterID.value}`);
  remove(ref(db, "Products/" + enterID.value))
    .then(() => {
      alert("Data has been deleted");
    })
    .catch((error) => {
      alert(error);
    });
}

removeBtn.addEventListener("click", removeData);
