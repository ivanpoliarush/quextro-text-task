# Notes Manager Application

## About the Project

Notes Manager is a web application designed to create, organize, and manage notes in a hierarchical structure. The core features include:

- **Topic Management**: Create, edit, delete, and move topics and subtopics.
- **Confidence Calculation**: Users can assign confidence levels to end-layer topics, with parent topics calculating their confidence as the average of child topics.
- **User Management**: Each user has isolated access, ensuring no unauthorized data sharing.

### Tech Stack:

- **Backend**: Express.js + TypeScript
- **Database**: MongoDB

## How to Run

Follow these steps to run the project locally:

### 1. Clone the Repository

```bash
git clone https://github.com/ivanpoliarush/quextro-text-task.git
cd quextro-text-task
```

### 2. Create the database

```bash
docker compose up -d
```

### 3. Install the packages

```bash
npm install
```

### 4. Build project

```bash
npm run build
```

### 5. Run project

```bash
npm run start
```
