
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
    location.reload(); // Reload page to update table
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
    location.reload(); // Reload page to update table
}

function generateTable(){
     // Empty out the old table
    let tableBody = document.querySelector("#mytable tbody");
    tableBody.innerHTML = "";
    fetch('/user/query')
        .then(response => response.json())
        .then(rows => {
            // Create a new HTML table element
            let table = document.createElement("table");
            table.setAttribute("border", "2");

            // Create the table header row
            let headerRow = document.createElement("tr");

            // Create the "Name" column header
            let nameHeader = document.createElement("th");
            nameHeader.textContent = "Name";
            headerRow.appendChild(nameHeader);

            // Create the "ID" column header
            let idHeader = document.createElement("th");
            idHeader.textContent = "ID";
            headerRow.appendChild(idHeader);

            // Create the "Points" column header
            let pointsHeader = document.createElement("th");
            pointsHeader.textContent = "Points";
            headerRow.appendChild(pointsHeader);

            // Add the header row to the table
            table.appendChild(headerRow);
            // Loop through the rows in the result set and create a table row for each row
            // console.log(rows);
            for (let i = 0; i < rows.length; i++) {
                // Get the current row data
                let row = rows[i];
                
                // Create a new table row
                let rowElement = document.createElement("tr");

                // Create the "Name" column cell
                let nameCell = document.createElement("td");
                nameCell.textContent = row.name;
                rowElement.appendChild(nameCell);

                // Create the "ID" column cell
                let idCell = document.createElement("td");
                idCell.textContent = row.id;
                rowElement.appendChild(idCell);

                // Create the "Points" column cell
                let pointsCell = document.createElement("td");
                pointsCell.textContent = row.points;
                rowElement.appendChild(pointsCell);

                // Add the row to the table
                table.appendChild(rowElement);
        }
        // Find the tbody element in the existing HTML file
        let tbody = document.querySelector("#mytable tbody");

        // Append the table to the tbody element
        tbody.appendChild(table);
        })
        .catch(error => console.error(error));
}


// Grant button functionality
let createUserButton = document.getElementById("createUser-button");
let searchUserButton = document.getElementById("searchUser-button");
let deleteUserButton = document.getElementById("deleteUser-button");

// Buttons wait until they're clicked
createUserButton.addEventListener("click", createUser);
searchUserButton.addEventListener("click", searchUser);
deleteUserButton.addEventListener("click", deleteUser);

window.onload = generateTable; // Load the table on page refresh
