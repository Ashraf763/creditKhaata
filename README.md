DESCRIPTION

CrediKhaata is a RESTful backend service designed to help shopkeepers manage customer credit accounts, track loans, record repayments, and receive alerts for overdue payments. Built with Node.js, Express, and MongoDB, this system provides secure authentication and comprehensive credit management features.


FEATURES

* User authentication with JWT

* Customer profile management

* Loan creation and tracking

* Repayment recording

* Overdue loan detection

* Secure data access (users only see their own data)


TECHNOLOGIES USED

* Backend: Node.js, Express

* Database: MongoDB (with Mongoose ODM)

* Authentication: JSON Web Tokens (JWT)

* Password Hashing: bcryptjs

* Environment Management: dotenv


PREREQUISITES

* Node.js (v14 or higher)

* npm (v6 or higher)

* MongoDB Atlas account or local MongoDB installation

* Postman testing tool


INSTALLATION


Clone the repository:

bash  git clone https://github.com/Ashraf763/crediKhaata.git
cd credikhaata
Install dependencies:


bash
npm install
Create a .env file in the root directory with the following variables:

MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
Start the development server:

bash
* npm start
  
The server should now be running on http://localhost:5000



API DOCUMENTATION


Authentication

REGISTER A NEW USER

* POST /api/auth/register

LOGIN 

*  POST /api/auth/login


GET ALL CUSTOMERS 

*  GET /api/customers
  
Headers: Authorization: Bearer jwt.token.here



Common error codes:

* 400 Bad Request - Invalid input data

* 401 Unauthorized - Missing or invalid authentication token

* 403 Forbidden - User not authorized to access the resource

* 404 Not Found - Resource not found

* 500 Internal Server Error - Server error
