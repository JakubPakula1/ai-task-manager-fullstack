# AI Task Manager - Full Stack Application

AI Task Manager is a comprehensive task management application that leverages artificial intelligence to help users prioritize their tasks based on task descriptions. This full-stack application consists of a React-based frontend, a Spring Boot backend, and an AI agent that uses the Ollama LLM model to analyze task descriptions and suggest priorities.

## Project Overview

This application provides a modern interface for managing tasks with AI-assisted prioritization. It offers features such as:

- User authentication and authorization
- Task creation, editing, and deletion
- Automated priority suggestions based on task descriptions
- Task filtering and sorting
- Admin dashboard for system oversight

## Tech Stack

### Frontend

- **Next.js**: React framework for server-side rendering and static site generation
- **Tailwind CSS**: Utility-first CSS framework
- **JS-Cookie**: For handling authentication tokens

### Backend

- **Spring Boot**: Java-based backend framework
- **Spring Security**: Authentication and authorization
- **JPA/Hibernate**: ORM for database operations
- **PostgreSQL**: Relational database

### AI Agent

- **Flask**: Python web framework
- **Ollama**: Integration with large language models (using llama3.2)
- **CORS**: Cross-Origin Resource Sharing support

### DevOps

- **Docker**: Containerization
- **Docker Compose**: Multi-container orchestration

## Getting Started

### Prerequisites

- Docker and Docker Compose
- Git

### Installation and Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/jakubpakula1/ai-task-manager-fullstack.git
   cd ai-task-manager-fullstack
   ```
2. Start the application using Docker Compose

```
docker-compose up --build
```

This command will build and start:

- PostgreSQL
- Spring Boot backend
- Next.js frontend
- Flask AI Agent
- Ollama LLM sevice

3. Access the application

- http://localhost:3000

4. Pull the Ollama model (first time only):

```
curl -X POST http://localhost:11434/api/pull -d '{"name": "llama3.2"}'
```

### Usage

# Authentication

Access the login page at /login
Create a new account at /register
Authentication is handled via JWT tokens stored in cookies
Tokens expire after 24 hours of inactivity

# Task Management

View all your tasks at the dashboard
Create new tasks by clicking "Add Task"
Edit tasks by clicking on them
Delete tasks using the delete button in edit mode
Tasks are automatically prioritized based on their description using AI
Filter tasks by status, priority, or due date
Sort tasks by different criteria

# Admin Features

Admins can view all users' tasks
Access the admin dashboard at /admin
Manage user accounts
Review system statistics
