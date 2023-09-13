# Project Name

This project provides APIs to manage and retrieve information about states and people within those states.

## Table of Contents

1. [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Local Setup](#local-setup)
2. [Folder Structure](#folder-structure)
3. [API Documentation](#api-documentation)
    - [List of All States](#list-of-all-states)
    - [List of People in a State](#list-of-people-in-a-state)
4. [Caveats](#caveats)
5. [Contributing](#contributing)
6. [License](#license)
7. [Hosting](#hosting)

## Getting Started

To get started with this project, follow the steps below.

### Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm: [Download](https://nodejs.org/)
- MongoDB: [Download](https://www.mongodb.com/)

### Local Setup

1. Clone the repository:

   git clone https://github.com/your/repo.git

2. Navigate to the project directory:

   cd project-directory

3. Install dependencies:

   npm install

4. Set up environment variables

5. Start the application:

   npm start

## Folder Structure

The project structure is organized as follows:

```
project-root/
│
├── src/
│   ├── routes/
│   ├── controllers/
│   ├── models/
│
├── package.json
│
└── README.md
```

## API Documentation

### List of All States

- **Endpoint**: `/get-states`
- **Method**: GET
- **Description**: Get a list of all states in the database.
- **Request**: None
- **Response**:
  - `200 OK` - List of states
  - `404 Not Found` - If no states are found

Example Request:

GET /get-states

Example Response:

[
  {
    "id": "state-1",
    "first_name": "Aswin",
    "last_name": "King",
    "country":"ZZ",
    "latitude":"78.4545485",
    "longitude:"12.3544236"
  },
  {
    "id": "state-2",
    "first_name": "Aswin",
    "last_name": "King",
    "country":"ZZ",
    "latitude":"78.4545485",
    "longitude:"12.3544236"
  }
]

### List of People in a State

- **Endpoint**: `/list-people-in-state/{stateId}`
- **Method**: GET
- **Description**: Get a list of all people living in a specific state.
- **Request Parameters**:
  - `stateId` (string, required) - The unique ID of the state.
- **Response**:
  - `200 OK` - List of people in the state
  - `404 Not Found` - If the state or people are not found

Example Request:

GET /list-people-in-state/state-1

Example Response:
[
  {
    "id": "person-1",
    "first_name": "John",
    "last_name": "Doe",
    "state": "state-1"
  },
  {
    "id": "person-2",
    "first_name": "Jane",
    "last_name": "Smith",
    "state": "state-1"
  }
]

## Caveats

There are currently no known issues or limitations with this project.

## Contributing

To contribute to this project, please follow the [contribution guidelines].

## License

This project is licensed under the [MIT License].

## Hosting

Heroku Deployment

Install the Heroku CLI and log in to your Heroku account.

Create a new Heroku app:

heroku create your-app-name
Deploy your code to Heroku:

git push heroku master
Open your app in the browser:

heroku open

---