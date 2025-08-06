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
- Presented at faculty-level tech showcase and received top evaluation.

---

## 📂 Demo Screenshot

---

## 🚀 Getting Started

> _Instructions to run locally (for developers):_

1. Clone the repository  
2. Configure `appsettings.json` for SQL Server connection  
3. Run migrations: `dotnet ef database update`  
4. Start back-end: `dotnet run`  
5. Start front-end: `npm start` (inside client folder)

---

## 📄 Authors
- [@TienNguyen002](https://github.com/TienNguyen002)
