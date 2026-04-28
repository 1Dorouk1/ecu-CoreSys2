const courseForm = document.getElementById("courseForm");
const coursesTable = document.getElementById("coursesTable");

const courseId = document.getElementById("courseId");
const titleInput = document.getElementById("title");
const codeInput = document.getElementById("code");
const creditHoursInput = document.getElementById("creditHours");
const departmentInput = document.getElementById("department");

const API_URL = "/api/courses";

async function getCourses() {
  const res = await fetch(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const courses = await res.json();

  coursesTable.innerHTML = "";

  courses.forEach((course) => {
    coursesTable.innerHTML += `
      <tr>
        <td>${course.title}</td>
        <td>${course.code}</td>
        <td>${course.creditHours}</td>
        <td>${course.department}</td>
        <td>
          <button class="action-btn edit-btn" onclick='editCourse(${JSON.stringify(course)})'>Edit</button>
          <button class="action-btn delete-btn" onclick="deleteCourse('${course._id}')">Delete</button>
        </td>
      </tr>
    `;
  });
}

courseForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const courseData = {
    title: titleInput.value,
    code: codeInput.value,
    creditHours: creditHoursInput.value,
    department: departmentInput.value
  };

  const id = courseId.value;

  await fetch(id ? `${API_URL}/${id}` : API_URL, {
    method: id ? "PUT" : "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(courseData)
  });

  courseForm.reset();
  courseId.value = "";
  getCourses();
});

function editCourse(course) {
  courseId.value = course.id;
  titleInput.value = course.title;
  codeInput.value = course.code;
  creditHoursInput.value = course.creditHours;
  departmentInput.value = course.department;
}

async function deleteCourse(id) {
  if (!confirm("Are you sure you want to delete this course?")) return;

  await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  getCourses();
}

getCourses();