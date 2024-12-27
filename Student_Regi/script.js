// Get references to form and table elements
const studentForm = document.getElementById('studentForm');
const recordsTable = document.getElementById('recordsTable');

// Retrieve existing records from local storage
let students = JSON.parse(localStorage.getItem('students')) || [];

// Function to render student records in the table
function renderTable() {
    recordsTable.innerHTML = '';
    students.forEach((student, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.id}</td>
            <td>${student.email}</td>
            <td>${student.contact}</td>
            <td class="actions">
                <button class="edit" onclick="editStudent(${index})">Edit</button>
                <button class="delete" onclick="deleteStudent(${index})">Delete</button>
            </td>
        `;
        recordsTable.appendChild(row);
    });
}

// Function to add a new student
studentForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('studentName').value.trim();
    const id = document.getElementById('studentID').value.trim();
    const email = document.getElementById('email').value.trim();
    const contact = document.getElementById('contact').value.trim();

    if (!validateInputs(name, id, email, contact)) return;

    const newStudent = { name, id, email, contact };
    students.push(newStudent);
    localStorage.setItem('students', JSON.stringify(students));

    studentForm.reset();
    renderTable();
});

// Function to validate input fields
function validateInputs(name, id, email, contact) {
    if (!name.match(/^[A-Za-z ]+$/)) {
        alert('Name must contain only letters and spaces.');
        return false;
    }
    if (!id.match(/^\d+$/)) {
        alert('Student ID must contain only numbers.');
        return false;
    }
    if (!email.match(/^\S+@\S+\.\S+$/)) {
        alert('Please enter a valid email address.');
        return false;
    }
    if (!contact.match(/^\d{10}$/)) {
        alert('Contact number must be a 10-digit number.');
        return false;
    }
    return true;
}

// Function to edit a student record
function editStudent(index) {
    const student = students[index];

    document.getElementById('studentName').value = student.name;
    document.getElementById('studentID').value = student.id;
    document.getElementById('email').value = student.email;
    document.getElementById('contact').value = student.contact;

    students.splice(index, 1);
    localStorage.setItem('students', JSON.stringify(students));
    renderTable();
}

// Function to delete a student record
function deleteStudent(index) {
    if (confirm('Are you sure you want to delete this record?')) {
        students.splice(index, 1);
        localStorage.setItem('students', JSON.stringify(students));
        renderTable();
    }
}

// Initial render of the table
renderTable();
