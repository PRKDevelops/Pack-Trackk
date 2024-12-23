const storedData = JSON.parse(localStorage.getItem('employeeData')) || [];
let employeeData = [...storedData];

// Submit employee data
function submitEmployeeData() {
    const name = document.getElementById('name').value;
    const shift = document.getElementById('shift').value;
    const category = document.getElementById('category').value;
    const weight = document.getElementById('weight').value;

    if (name && shift && category && weight) {
        const time = new Date().toISOString();
        const data = { name, shift, category, weight, time };

        // Save the data to localStorage
        employeeData.push(data);
        localStorage.setItem('employeeData', JSON.stringify(employeeData));

        // Send data to the Admin Panel
        addEmployeeData(data);

        // Display updated data
        displayEmployeeData();
    } else {
        alert('Please fill in all fields!');
    }
}

// Display employee data in the Employee Panel
function displayEmployeeData() {
    const tableBody = document.querySelector('#employee-data-table tbody');
    tableBody.innerHTML = ''; // Clear previous data

    employeeData.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.shift}</td>
            <td>${item.category}</td>
            <td>${item.weight}</td>
            <td>${item.time}</td>
        `;
        tableBody.appendChild(row);
    });
}

// Download report of today's data
function downloadReport() {
    const todayData = employeeData.filter(data => new Date(data.time).toLocaleDateString() === new Date().toLocaleDateString());
    const csvContent = 'Name,Shift,Category,Weight,Time\n' + todayData.map(data => `${data.name},${data.shift},${data.category},${data.weight},${data.time}`).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'todays_report.csv';
    link.click();
}

// Send the employee data to the Admin Panel
function addEmployeeData(data) {
    const event = new CustomEvent('newEmployeeData', { detail: data });
    window.dispatchEvent(event);
}

// Logout function
function logout() {
    localStorage.removeItem('employeeData');
    window.location.href = 'login.html';  // Redirect to login page (replace with your login page)
}

// Initial display of employee data
displayEmployeeData();