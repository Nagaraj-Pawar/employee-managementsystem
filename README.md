employee-managementsystem
Frontend using React js and Backend using Spring Boot
# Employee Management System (EMS)

A full-stack Employee Management System built using **Spring Boot** (Backend) and **React.js** (Frontend).  
This application allows **Admins** to manage employees, projects, finance, and professional details, while **Employees** can securely view their own information.

---

## 🚀 Features

### 👨‍💼 Admin Module
- Admin Login
- Add / Update / Delete Employees
- Assign Projects to Employees
- Manage Employee Finance (Salary, Bank Details)
- Manage Professional Details
- View all employees, projects, finance & professional data

### 👨‍💻 Employee Module
- Employee Login
- View Own Profile
- View Assigned Projects
- View Finance Details
- View Professional Details
- Secure Logout

---

## 🛠️ Tech Stack

### Frontend
- React.js
- React Router DOM
- Axios
- Bootstrap 5
- HTML5, CSS3, JavaScript (ES6)

### Backend
- Java 21
- Spring Boot 3.x
- Spring Data JPA
- REST APIs
- MySQL
- Maven

---

## 🗂️ Project Structure

### Backend
src/main/java/com/ems
├── controller
├── entity
├── repository
├── EmployeeManagementProjectApplication.java
### Frontend
src
├── components
├── pages
│ ├── admin
│ └── employee
├── services
├── App.jsx
└── index.js
## ⚙️ Setup Instructions

### 1️⃣ Backend Setup
1. Open backend project in **Spring Tool Suite / IntelliJ**
2. Configure `application.properties`
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/ems_db
   spring.datasource.username=root
   spring.datasource.password=your_password
   spring.jpa.hibernate.ddl-auto=updateBackend runs at:

http://localhost:8080

2️⃣ Frontend Setup
Open frontend folder
Install dependencies:
npm install
Start React app:
npm start
Frontend runs at:
http://localhost:3000
🔐 Default Roles
Role	Access
ADMIN	Full system control
EMPLOYEE	View own details only
📡 API Endpoints (Sample)
Authentication
POST /login
Employee
GET /employee/{id}
##########
Projects
GET /projects
POST /projects/{empId}
GET /projects/employee/{empId}
##############
Finance
GET /finance
POST /finance/{empId}
GET /finance/employee/{empId}
#################
Professional
GET /professional
POST /professional/{empId}
GET /professional/employee/{empId}
################
🎯 Key Highlights
Role-based access (Admin / Employee)
Clean REST architecture
Bootstrap responsive UI
Secure data separation per employee
Real-world enterprise design
<img width="1901" height="972" alt="Screenshot 2026-01-13 175101" src="https://github.com/user-attachments/assets/29601a2e-5927-42c4-9fbd-64d04ea9131f" />
<img width="1899" height="806" alt="Screenshot 2026-01-13 175120" src="https://github.com/user-attachments/assets/1373b2ec-196a-44a7-be30-00d81424f17b" <img width="1894" height="965" alt="Screenshot 2026-01-13 175141" src="https://github.com/user-attachments/assets<img width="1917" height="922" alt="Screenshot 2026-01-13 175153" src="https://github.com/user-attachments/assets/89ce67f8-2576-413b-a4d5-657de2051197" /><img width="1899" height="806" alt="Screenshot 2026-01-13 175120" src="https://github.com/user-attachments/assets/b380441d-476b-42a2-be58-6a0e2805186e" />#
/e3abd9fb-cadc-46fd-a026-9c5bd15faa4a" />
/><img width="1919" height="860" alt="Screenshot 2026-01-13 175202" src="https://github.com/user-attachments/assets/116a79ed-2d5c-47d0-ba73-a817edbddf2a" />
<img width="1908" height="998" alt="Screenshot 2026-01-13 220052" src="https://github.com/user-attachments/assets/9a894849-a9f8-4b41-9730-c2c9daced8f6" />
<img width="1917" height="957" alt="Screenshot 2026-01-13 220219" src="https://github.com/user-attachments/assets/d641e9ca-97f6-491e-9d68-cf4d16bb5a0c" />
<img width="1912" height="946" alt="Screenshot 2026-01-13 220255" src="https://github.com/user-attachments/assets/57ea9e10-c2d1-429b-b5fa-0511e6ffc79f" />
<img width="1911" height="967" alt="Screenshot 2026-01-13 220324" src="https://github.com/user-attachments/assets/6c410f03-5f46-4139-a138-4137125df9b9" />

yaml
Copy code
