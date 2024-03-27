# GoodWords: A Simple Blogging Platform

GoodWords is a minimalist yet powerful blogging platform designed to empower users to share their thoughts, stories, and ideas with the world. 

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js installed
- PostgreSQL installed and running

## Installation

To install and run this project locally, follow these steps:

1. **Clone the repository:**
  ```git clone https://github.com/Adnanrobi/GoodWords.git```
2. **Navigate into the project directory:**
   ```cd project-name```
3. **Install dependencies:**
  ```npm install```
## Configuration

Before running the project, you need to set up the following configurations:

### Backend Configuration:
1. Create a .env file in the root directory of the backend.
2. Add your database connection URL:
   ```DATABASE_URL="postgresql://username:password@localhost:5432/database_name"```

## Database Migration
1. To initialize the database schema, run the following command:
```npx prisma migrate dev```

## Running the Application
1. To run the backend server, execute: ```npm run dev```
2. To start the frontend development server, execute: ```npm start```
3. Access the application at ```http://localhost:3000```
