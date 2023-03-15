
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
    fetch('/api', options).then(result => {
        console.log('createUser success')
    });
}

function searchUser(){ //GET
    // Get id data from textbox
    let userId = document.getElementById("searchUser-id").value;

    // clear out any existing child nodes from the searchResult div
    const resultDiv = document.getElementById('searchResult');
    while (resultDiv.firstChild) {
        resultDiv.removeChild(resultDiv.firstChild);
    }

    // make a GET request to the server to fetch data
    fetch(`/users/${userId}`)
        .then(response => response.json())
        .then(user => {
        // create a new paragraph element with the fetched data
        const p = document.createElement('p');
        if(user.name !== "null"){
            p.textContent = `User ${user.name} was found with id ${user.id} and a point value of ${user.points}.`;
        }
        else{
            p.textContent = `User was not found. Please try a different ID.`;
        }
        // add the new paragraph element to the result div
        resultDiv.appendChild(p);
        })
        .catch(error => console.error(error));
}

function deleteUser(){
    // Get id data from textbox
    let ID = document.getElementById("deleteUser-id").value;
    if (ID !== ""){
        let newData = {id:ID};
        const options = {
            method: 'DELETE',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(newData)
        };
        fetch('/api', options).then(result => {
            console.log('deleteUser success')
        });
    }
    else{
        console.log('deleteUser failed; enter some input')
    }
}



// Grant button functionality
let createUserButton = document.getElementById("createUser-button");
let searchUserButton = document.getElementById("searchUser-button");
let deleteUserButton = document.getElementById("deleteUser-button");

// Buttons wait until they're clicked
createUserButton.addEventListener("click", createUser);
searchUserButton.addEventListener("click", searchUser);
deleteUserButton.addEventListener("click", deleteUser);