// Fetch data from the server using fetch API
fetch('/persons')
  .then(response => response.json())
  .then(data => {
    // Get a reference to the table element
    const table = document.querySelector('#persons-table');

    // Create a table header row
    const headerRow = document.createElement('tr');
    headerRow.innerHTML = `
      <th>ID</th>
      <th>Name</th>
      <th>Email</th>
      <th>Phone</th>
    `;
    table.appendChild(headerRow);

    // Loop through the data and create a table row for each person
    data.forEach(person => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${person.id}</td>
        <td>${person.name}</td>
        <td>${person.email}</td>
        <td>${person.phone}</td>
      `;
      table.appendChild(row);
    });
  })
  .catch(error => {
    console.error(error);
  });
