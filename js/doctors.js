const doctorForm = document.getElementById("doctorForm");
const doctorsTable = document.getElementById("doctorsTable");

const doctorId = document.getElementById("doctorId");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const departmentInput = document.getElementById("department");
const specializationInput = document.getElementById("specialization");

const API_URL = "/api/doctors";

async function getDoctors() {
  const res = await fetch(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const doctors = await res.json();

  doctorsTable.innerHTML = "";

  doctors.forEach((doctor) => {
    doctorsTable.innerHTML += `
      <tr>
        <td>${doctor.name}</td>
        <td>${doctor.email}</td>
        <td>${doctor.phone}</td>
        <td>${doctor.department}</td>
        <td>${doctor.specialization}</td>
        <td>
          <button class="action-btn edit-btn" onclick='editDoctor(${JSON.stringify(doctor)})'>Edit</button>
          <button class="action-btn delete-btn" onclick="deleteDoctor('${doctor._id}')">Delete</button>
        </td>
      </tr>
    `;
  });
}

doctorForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const doctorData = {
    name: nameInput.value,
    email: emailInput.value,
    phone: phoneInput.value,
    department: departmentInput.value,
    specialization: specializationInput.value
  };

  const id = doctorId.value;

  await fetch(id ? `${API_URL}/${id}` : API_URL, {
    method: id ? "PUT" : "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(doctorData)
  });

  doctorForm.reset();
  doctorId.value = "";
  getDoctors();
});

function editDoctor(doctor) {
  doctorId.value = doctor.id;
  nameInput.value = doctor.name;
  emailInput.value = doctor.email;
  phoneInput.value = doctor.phone;
  departmentInput.value = doctor.department;
  specializationInput.value = doctor.specialization;
}

async function deleteDoctor(id) {
  if (!confirm("Are you sure you want to delete this doctor?")) return;

  await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  getDoctors();
}

getDoctors();