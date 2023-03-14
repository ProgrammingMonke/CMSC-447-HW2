
// Get user input for createUser, and format it into json format
function createUser(){
    let data = []; // initialize an empty array
    
    // Get username, id, and points data from textboxes
    let username = document.getElementById("createUser-name").value;
    if (username !== "") {data.push(username);}
    let id = document.getElementById("createUser-id").value;
    if (id !== "") {data.push(id);}
    let points = document.getElementById("createUser-points").value;
    if (points !== "") {data.push(points);}

    let newData = {name:data[0],id:data[1],points:data[2]};
    const options = {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(newData)
    };
    fetch(`/api`, options).then(result => {
        console.log('success')
    });
}

function searchUser(){
    let myArray = []; // initialize an empty array

    // Get username, and id data from textboxes
    let username = document.getElementById("searchUser-name").value;
    if (username !== "") {myArray.push(username);}
    let id = document.getElementById("searchUser-id").value;
    if (id !== "") {myArray.push(id);}
  
    // log the array to the console for testing
    console.log(myArray);
}

function deleteUser(){
    let myArray = []; // initialize an empty array

    // Get username, and id data from textboxes
    let username = document.getElementById("deleteUser-name").value;
    if (username !== "") {myArray.push(username);}
    let id = document.getElementById("deleteUser-id").value;
    if (id !== "") {myArray.push(id);}
  
    // log the array to the console for testing
    console.log(myArray);
}

function retrievePoints(){
    let myArray = []; // initialize an empty array

    // Get username, and id data from textboxes
    let username = document.getElementById("retrievePoints-name").value;
    if (username !== "") {myArray.push(username);}
    let id = document.getElementById("retrievePoints-id").value;
    if (id !== "") {myArray.push(id);}
  
    // log the array to the console for testing
    console.log(myArray);
}


// Grant button functionality
let createUserButton = document.getElementById("createUser-button");
let searchUserButton = document.getElementById("searchUser-button");
let deleteUserButton = document.getElementById("deleteUser-button");
let retrievePointsButton = document.getElementById("retrievePoints-button");

// Buttons wait until they're clicked
createUserButton.addEventListener("click", createUser);
searchUserButton.addEventListener("click", searchUser);
deleteUserButton.addEventListener("click", deleteUser);
retrievePointsButton.addEventListener("click", retrievePoints);