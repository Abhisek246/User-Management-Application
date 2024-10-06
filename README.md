# User-Management-Application
This project retrieves data from an external API and stores it in a MongoDB database. It offers complete CRUD (Create, Read, Update, Delete) functionality, along with a dynamic search feature that allows users to search by **name** and **username**. Additionally, the application provides **toast notifications** for better user interaction.

## Features
- Fetches data from an external API and stores it in MongoDB.
- Full CRUD operations on the data:
  - **Create:** Add new entries.
  - **Read:** View saved data.
  - **Update:** Edit existing data.
  - **Delete:** Remove data from the database.
- **Dynamic Search:** Search entries by name or username in real-time.
- **Toast Notifications:** Get instant feedback for actions like data submission, updates, deletions, etc.

## Setup Instructions

### Installation
1. **Backend Setup**
   - Navigate to the `backend` directory.
   - Install the required Node.js packages:
     cd backend
     npm install

2. **Frontend Setup**
   - Navigate to the `frontend` directory.
   - Install the required Node.js packages:
     cd frontend
     npm install

### Running the Project
1. Start the MongoDB server. Replace the MONGO_URL in index.js file with original Mongodb database link.
2. Start the backend server:
   cd backend
   nodemon index.js
   
4. Start the frontend:
   cd frontend
   npm run dev

## Usage
- Use the web interface to perform CRUD operations.
- The dynamic search bar allows filtering of data by name or username.
- Toast notifications will appear to confirm actions such as data saving, updating, or deletion.


Video Link - https://drive.google.com/file/d/14AElcD3yluhaInVPMbPezLfWQwNENjxV/view?usp=sharing
