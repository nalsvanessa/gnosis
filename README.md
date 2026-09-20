# Gnosis

Gnosis is a full-stack web application that encourages users to step outside their comfort zone and learn from their experiences. Users can create challenges, record reflections, track completed challenges and view their progress over time.

The name **Gnosis** comes from the Greek word for experiential or personal knowledge.

## Features

* Create new challenges
* View completed and incomplete challenges
* Edit existing challenges
* Delete challenges
* Add reflections to challenges
* Filter challenges by completion status, category and month
* View the total number of completed challenges
* View completed challenges by category
* View progress over time using a chart
* Responsive frontend for different screen sizes

## Tech Stack

### Frontend

* React
* TypeScript
* Vite
* React Router
* Recharts
* CSS

### Backend

* Java 21
* Spring Boot
* Spring Web
* Spring Data JPA
* Spring Validation
* Maven

### Database

* MySQL 8.4

### Infrastructure

* Docker
* Docker Compose

## Project Structure

```text
gnosis/
├── api/
│   ├── src/
│   ├── Dockerfile
│   ├── local.properties.example
│   └── pom.xml
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── data-types/
│   │   └── ...
│   ├── Dockerfile
│   └── package.json
├── postman/
│   └── Gnosis api.postman_collection.json
├── docker-compose.yml
├── .env.example
└── README.md
```

## Prerequisites

For local development:

* Java 21
* Node.js and npm
* MySQL

For running the complete application with Docker:

* Docker Desktop

The project includes the Maven Wrapper, so Maven does not need to be installed separately.

## Local Setup

### 1. Clone the repository

```bash
git clone <repository-url>
cd gnosis
```

### 2. Configure the backend

Inside the `api` directory, copy the example configuration file:

```text
api/local.properties.example
```

to:

```text
api/local.properties
```

Add your local MySQL database configuration to `local.properties`.

This file is ignored by Git so local database credentials are not committed to the repository.

### 3. Set up the database

Create a MySQL database using the database name configured in your local properties.

The project contains:

```text
api/src/main/resources/schema.sql
api/src/main/resources/data.sql
```

`schema.sql` creates the `challenges` table and `data.sql` provides initial usable challenge records.

The seed data contains a mixture of completed and incomplete challenges across different categories and difficulty levels.

### 4. Start the backend

From the `api` directory:

```bash
./mvnw.cmd spring-boot:run
```

The API will be available at:

```text
http://localhost:8080
```

### 5. Start the frontend

From the `frontend` directory:

```bash
npm install
npm run dev
```

The frontend will be available at:

```text
http://localhost:5173
```

## Docker Setup

The application can also be run using Docker Compose.

### 1. Create the Docker environment file

Copy:

```text
.env.example
```

to:

```text
.env
```

Add your own values for:

```env
MYSQL_ROOT_PASSWORD=
MYSQL_DATABASE=
MYSQL_USER=
MYSQL_PASSWORD=
```

The `.env` file is ignored by Git.

### 2. Build and start the application

From the project root:

```bash
docker compose up --build
```

Docker Compose starts:

* MySQL
* Spring Boot API
* React frontend

The API waits for MySQL to become healthy before starting.

### 3. Access the application

Frontend:

```text
http://localhost:5173
```

Backend API:

```text
http://localhost:8080
```

MySQL runs on port `3306` internally within the Docker network and is not exposed to the host machine.

### 4. Stop the application

```bash
docker compose down
```

To stop the containers while keeping the database volume:

```bash
docker compose down
```

The MySQL data is stored in the `mysql-data` Docker volume.

## API Documentation

The API follows a RESTful structure using a Controller, Service and Repository architecture.

```text
Frontend
   ↓
Controller
   ↓
Service
   ↓
Repository
   ↓
MySQL
```

### Endpoints

| Method | Endpoint                       | Description                                  | Success |
| ------ | ------------------------------ | -------------------------------------------- | ------- |
| GET    | `/api/challenge/{id}`          | Get a challenge by ID                        | 200 OK  |
| GET    | `/api/challenge/month/{month}` | Get completed challenges for a month         | 200 OK  |
| GET    | `/api/challenge/incomplete`    | Get incomplete challenges                    | 200 OK  |
| GET    | `/api/challenge/completed`     | Get completed challenges                     | 200 OK  |
| GET    | `/api/challenge/progress`      | Get completed challenges grouped by month    | 200 OK  |
| GET    | `/api/challenge/category`      | Get completed challenges grouped by category | 200 OK  |
| POST   | `/api/challenge/addChallenge`  | Create a new challenge                       | 200 OK  |
| PUT    | `/api/challenge/{id}`          | Update a challenge                           | 200 OK  |
| DELETE | `/api/challenge/{id}`          | Delete a challenge                           | 200 OK  |

### GET Challenge by ID

```text
GET /api/challenge/{id}
```

Example:

```text
GET /api/challenge/1
```

Returns the challenge matching the supplied ID.

If the challenge does not exist, the application returns a `404 NOT FOUND` response with an error message.

### GET Completed Challenges by Month

```text
GET /api/challenge/month/{month}
```

Example:

```text
GET /api/challenge/month/1
```

Returns completed challenges for the specified month.

The month must be between `1` and `12`.

### GET Incomplete Challenges

```text
GET /api/challenge/incomplete
```

Returns all challenges that are currently incomplete.

### GET Completed Challenges

```text
GET /api/challenge/completed
```

Returns all completed challenges.

### GET Progress

```text
GET /api/challenge/progress
```

Returns the number of completed challenges grouped by month.

Example response:

```json
{
  "1": 2,
  "2": 4
}
```

### GET Challenges by Category

```text
GET /api/challenge/category
```

Returns completed challenges grouped by category.

### POST Add Challenge

```text
POST /api/challenge/addChallenge
```

Example request body:

```json
{
  "title": "Find a new job",
  "difficulty": "Medium",
  "description": "Apply for 1 job every week",
  "category": "Career",
  "reflection": null,
  "completed": false,
  "completedAt": null
}
```

The backend automatically sets the `createdAt` date when a new challenge is created.

### PUT Update Challenge

```text
PUT /api/challenge/{id}
```

Example:

```text
PUT /api/challenge/1
```

Example request body:

```json
{
  "title": "Talk to stranger",
  "difficulty": "Hard",
  "description": "On your commute, try to have a conversation with a stranger.",
  "category": "Social",
  "reflection": "I felt more comfortable starting the conversation this time.",
  "completed": false
}
```

The endpoint updates the existing challenge.

When a challenge changes from incomplete to completed, the backend records the completion date. When it changes from completed to incomplete, the completion date is cleared.

### DELETE Challenge

```text
DELETE /api/challenge/{id}
```

Example:

```text
DELETE /api/challenge/1
```

Deletes the specified challenge.

## Request and Response Data

Challenges use the following structure:

```json
{
  "id": 1,
  "title": "Talk to stranger",
  "difficulty": "Hard",
  "description": "On your commute, try to have a conversation with a stranger.",
  "category": "Social",
  "createdAt": "2026-05-03",
  "reflection": "I felt more comfortable starting the conversation.",
  "completed": true,
  "completedAt": "2026-05-10"
}
```

The frontend uses a TypeScript `Challenge` interface to represent this API response.

## API Error Handling

The backend uses a centralised `@ControllerAdvice` exception handler.

A custom `ChallengeNotFoundException` is used when a requested challenge cannot be found.

Example:

```text
404 NOT FOUND
Error: Challenge not found
```

Validation is also used on incoming challenge requests through Spring Validation.

## Database

The application uses MySQL for relational persistence.

The `challenges` table includes:

| Column         | Type     | Description                     |
| -------------- | -------- | ------------------------------- |
| `id`           | SMALLINT | Primary key with auto-increment |
| `title`        | VARCHAR  | Challenge title                 |
| `difficulty`   | VARCHAR  | Challenge difficulty            |
| `description`  | TEXT     | Challenge description           |
| `category`     | VARCHAR  | Challenge category              |
| `created_at`   | DATE     | Date challenge was created      |
| `reflection`   | TEXT     | User reflection                 |
| `completed`    | BOOLEAN  | Completion status               |
| `completed_at` | DATETIME | Date challenge was completed    |

The project currently uses a single table, so no foreign keys are required.

## Seed Data

The project includes initial challenge records in `data.sql`.

The seed data provides a mixture of:

* Completed and incomplete challenges
* Social challenges
* Career challenges
* Learning challenges
* Health & Fitness challenges
* Creativity challenges
* Easy, Medium and Hard challenges

The records are inserted only when a challenge with the same title does not already exist.

## Manual API Testing

All nine API endpoints were manually tested using Postman.

A Postman collection containing the API requests is included in:

```text
postman/Gnosis api.postman_collection.json
```

The collection contains requests for:

* Getting a challenge by ID
* Getting completed challenges by month
* Getting incomplete challenges
* Getting completed challenges
* Getting progress
* Getting challenges by category
* Adding a challenge
* Updating a challenge
* Deleting a challenge

The Postman collection can be imported into Postman to view and run the API requests.

## Frontend

The frontend is built with React and TypeScript.

React hooks including `useState` and `useEffect` are used for managing component state and fetching API data.

The application contains three main pages:

### Dashboard

Displays:

* Number of completed challenges
* Progress over time
* Recent completed challenges
* Completed challenges by category

### Challenges

Displays challenge cards and allows users to:

* View challenge information
* Edit challenges
* Delete challenges
* Filter by completion status
* Filter by category
* Filter by month

### Add Challenge

Provides a validated form for creating new challenges.

The form performs client-side validation before submitting the request, while the backend also uses Spring Validation.

## Docker Architecture

Docker Compose runs three services:

```text
             ┌───────────────┐
             │   Frontend    │
             │    :5173      │
             └───────┬───────┘
                     │
                     ▼
             ┌───────────────┐
             │      API      │
             │    :8080      │
             └───────┬───────┘
                     │
                     ▼
             ┌───────────────┐
             │     MySQL     │
             │ :3306 internal│
             └───────────────┘
```

The services communicate through the Docker network `gnosis-network`.

Database credentials are provided to Docker Compose through environment variables rather than being hardcoded into the Java application.

The API depends on the database health check before starting.

## Assessment Requirements

### Frontend

* TypeScript interfaces are used for API response data.
* React hooks are used for state management and API requests.
* The Add Challenge page contains a validated form.
* Challenges are displayed using reusable challenge card components.

### Backend

* RESTful GET and write endpoints are provided.
* Controller, Service and Repository layers separate responsibilities.
* A custom exception extends `RuntimeException`.
* Centralised exception handling is implemented using `@ControllerAdvice`.

### MySQL

* MySQL provides relational persistence.
* The `challenges` table uses explicit column types.
* The `id` column is an auto-incrementing primary key.

### Docker

* Docker Compose orchestrates the frontend, backend and MySQL services.
* Database configuration is supplied through environment variables.
* Services communicate using a Docker network.
* The API waits for the MySQL health check before starting.

### Documentation

* This README provides local setup instructions.
* Configuration variables and environment setup are documented.
* Frontend and API access points are provided.
* All nine API endpoints are documented.
* A manual Postman collection is included for API documentation and testing.
* `schema.sql` and `data.sql` provide the database structure and initial records.

### GitHub Project Board

The project includes a GitHub Project Board containing the foundational development tasks used to plan and track the project.

## Future Improvements

Possible future improvements include:

* User accounts and authentication
* Persistent user-specific challenges
* More detailed progress statistics
* Improved challenge completion controls
* More advanced filtering
* Production frontend deployment using a multi-stage Dockerfile and Nginx
* Kubernetes deployment

## Running the Complete Application with Docker

From the project root:

```bash
docker compose up --build
```

Then open:

```text
http://localhost:5173
```

The API is available at:

```text
http://localhost:8080
```

To stop the application:

```bash
docker compose down
```

## Final Submission Checklist

Before submitting Gnosis, check that:

* [ ] README is updated and committed
* [ ] `.env.example` is included
* [ ] `api/local.properties.example` is included
* [ ] `.env` is not committed
* [ ] `api/local.properties` is not committed
* [ ] `schema.sql` is included
* [ ] `data.sql` is included
* [ ] Frontend and backend Dockerfiles are included
* [ ] `docker-compose.yml` is included
* [ ] Postman collection is included
* [ ] All nine API endpoints are documented
* [ ] Docker Compose starts the complete application successfully
* [ ] Frontend is accessible on port 5173
* [ ] API is accessible on port 8080
* [ ] GitHub Project Board contains the required foundational cards
