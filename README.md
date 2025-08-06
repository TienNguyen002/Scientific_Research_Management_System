# Scientific Research Management System

## 📚 Overview

The Scientific Research Management System is a full-stack web application developed to streamline the workflow of managing scientific research activities within a university environment. The system was designed for multiple user roles — including students, lecturers, and department administrators — to manage and track research topics, assignments, approvals, and reports in one centralized platform.

---

## ✔️ Features

### 👨‍🎓 User-side (Student & Lecturer)

- View completed and approved research topics.
- Search topics by name and view detailed information.
- Display faculties with their associated students, lecturers, and research topics.
- View detailed profiles for faculties, students, lecturers, and topics.
- Show student groups and their assigned supervisors.
- Register/Login for students.
- Students can register topics and upload research files (PDF, Word).
- Students and lecturers can update personal information.

### 🛡️ Admin-side

- Dashboard overview of system metrics (active users, topics, faculties, etc.).
- Role-based login and access control.
- Full CRUD operations for research topics.
- Assign lecturers to specific research topics.
- Manage student and lecturer accounts.
- Add, update, or remove faculty records.

---

## 🛠️ Technologies Used

- **Frontend**: ReactJS, Bootstrap
- **Backend**: ASP.NET Core, Entity Framework Core
- **Database**: SQL Server
- **Other**: RESTful API, Redis (caching)

---

## 📊 System Highlights

- Role-based access: Student / Lecturer / Admin.
- Clean RESTful APIs and layered architecture.
- Statistical reporting by department and semester.
- 200+ topics and 120+ users supported in testing phase.

---

## 📂 Demo Screenshot

### 👨‍🎓 User Page (Student & Lecturer)

🔸 Home Page <br/>
![Home Page](screenshots/home-page.png) <br/>

🔸 Research Topics List Page <br/>
![Research List](screenshots/research-list.png) <br/>

🔸 Research Topics Detail <br/>
![Research Detail](screenshots/research-detail.png) <br/>

🔸 Faculties List Page <br/>
![Faculties List](screenshots/faculities-list.png) <br/>

🔸 Faculty Detail <br/>
![Faculty Detail](screenshots/faculity-detail-1.png) <br/>
![Faculty Detail](screenshots/faculity-detail-2.png) <br/>
![Faculty Detail](screenshots/faculity-detail-3.png) <br/>
![Faculty Detail](screenshots/faculity-detail-4.png) <br/>

🔸 Students List Page <br/>
![Students List](screenshots/students-list.png) <br/>

🔸 Student Detail <br/>
![Student Detail](screenshots/student-detail-1.png) <br/>
![Student Detail](screenshots/student-detail-2.png) <br/>

🔸 Lecturers List Page <br/>
![Lecturers List](screenshots/lecturers-list.png) <br/>

🔸 Lecturer Detail <br/>
![Lecturer Detail](screenshots/lecturer-detail-1.png) <br/>
![Lecturer Detail](screenshots/lecturer-detail-2.png) <br/>

🔸 Admin Contact <br/>
![Admin Contact](screenshots/admin-contact.png) <br/>

🔸 Login & Register <br/>
![Login](screenshots/login.png) <br/>
![Register](screenshots/register.png) <br/>
![Student Login](screenshots/student-login.png) <br/>

### 👨‍🎓 Student Profile Page

🔸 Student Profile <br/>
![Student Profile](screenshots/student-profile.png) <br/>

🔸 Student Register Topic <br/>
![Student Register Topic](screenshots/student-register-topic.png) <br/>

🔸 Student Manage Topic <br/>
![Student Manage Topic](screenshots/student-manage-topic-1.png) <br/>
![Student Manage Topic](screenshots/student-manage-topic-2.png) <br/>
![Student Manage Topic](screenshots/student-manage-topic-3.png) <br/>

🔸 Student Change Password <br/>
![Student Change Password](screenshots/student-change-password.png) <br/>

### 🛡️ Admin Page

🔸 Login <br/>
![Login](screenshots/admin-login.png) <br/>

🔸 Dashboard <br/>
![Dashboard](screenshots/admin-dashboard.png) <br/>

🔸 Manage Faculities <br/>
![Manage Faculities](screenshots/admin-manage-faculties.png) <br/>
![Add Or Update](screenshots/admin-manage-faculity-addorupdate.png) <br/>

🔸 Manage Topics <br/>
![Manage Topics](screenshots/admin-manage-topics.png) <br/>
![Add Or Update](screenshots/admin-manage-topic-addorupdate.png) <br/>

🔸 Manage Students <br/>
![Manage Students](screenshots/admin-manage-students.png) <br/>

🔸 Manage Lecturers
![Manage FaculitLecturersies](screenshots/admin-manage-lecturers.png) <br/>
![Add Or Update](screenshots/admin-manage-lecturer-addorupdate.png) <br/>

🔸 Manage Feedbacks <br/>
![Manage Feedbacks](screenshots/admin-manage-feedbacks.png) <br/>

🔸 Manage Profile <br/>
![Manage Profile](screenshots/admin-manage-profile.png) <br/>
![Change Password](screenshots/admin-change-password.png) <br/>

---

## 🚀 Getting Started

### 🧰 Prerequisites

Make sure the following tools are installed on your machine:

- [Visual Studio 2022](https://visualstudio.microsoft.com/)
- [Visual Studio Code](https://code.visualstudio.com/)
- [SQL Server](https://www.microsoft.com/en-us/sql-server)
- [Node.js](https://nodejs.org/)
- [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/)

### ⚙️ Backend Setup (.NET Web API)

1. Navigate to the project folder:  
   `src/back-end/Server`

2. Open `Server.sln` using **Visual Studio 2022**.

3. In the Solution Explorer:

   - Right-click on `WebApi`
   - Select **"Set as Startup Project"**

4. Press `F5` or click the green ▶️ button (with **https**) to run the project.

5. The API Swagger UI should appear in your browser.

### 🌐 Frontend Setup (ReactJS)

1. Open a terminal in:  
   `src/front-end/client`

2. Run the following command to install dependencies:

   ```bash
   yarn install
   ```

   > After installation, the `node_modules` folder will be created.

3. Start the React client:

   ```bash
   yarn start
   ```

4. The app will be served at [http://localhost:3000](http://localhost:3000)

---

## 📄 Authors

- [@TienNguyen002](https://github.com/TienNguyen002)
- This project is part of a university course and is intended for educational use only.
