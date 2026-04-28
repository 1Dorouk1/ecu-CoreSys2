const studentForm = document.getElementById("studentForm");
const studentsTable = document.getElementById("studentsTable");

const studentId = document.getElementById("studentId");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const departmentInput = document.getElementById("department");
const levelInput = document.getElementById("level");

const API_URL = "/api/students";

async function getStudents() {
  const res = await fetch(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const students = await res.json();

  studentsTable.innerHTML = "";

  students.forEach((student) => {
    studentsTable.innerHTML += `
      <tr>
        <td>${student.name}</td>
        <td>${student.email}</td>
        <td>${student.phone}</td>
        <td>${student.department}</td>
        <td>${student.level}</td>
        <td>
          <button class="action-btn edit-btn" onclick='editStudent(${JSON.stringify(student)})'>Edit</button>
          <button class="action-btn delete-btn" onclick="deleteStudent('${student._id}')">Delete</button>
        </td>
      </tr>
    `;
  });
}

studentForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const studentData = {
    name: nameInput.value,
    email: emailInput.value,
    phone: phoneInput.value,
    department: departmentInput.value,
    level: levelInput.value
  };

  const id = studentId.value;

  await fetch(id ? `${API_URL}/${id}` : API_URL, {
    method: id ? "PUT" : "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(studentData)
  });

  studentForm.reset();
  studentId.value = "";
  getStudents();
});

function editStudent(student) {
  studentId.value = student.id;
  nameInput.value = student.name;
  emailInput.value = student.email;
  phoneInput.value = student.phone;
  departmentInput.value = student.department;
  levelInput.value = student.level;
}

async function deleteStudent(id) {
  if (!confirm("Are you sure you want to delete this student?")) return;

  await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  getStudents();
}

getStudents();