# Cinema Reservation Platform

This project is a Cinema Reservation Platform consisting of a Java Enterprise Edition (JEE) backend and a React frontend.

## Project Structure

-   `/Backend`: Contains the JEE backend application.
-   `/Frontend`: Contains the React frontend application.

## Backend (JEE)

The backend is developed using Java Enterprise Edition. It handles business logic, data persistence, and API endpoints for the cinema reservation system.

### Key Technologies:
-   Java Enterprise Edition (JEE)
-   JPA (Java Persistence API) for database interaction
-   JAX-RS for RESTful web services

### Setup & Running (Backend)
*(Details to be added on how to set up and run the backend server, e.g., deploying to an application server like WildFly/Tomcat, database setup, etc.)*

1.  Ensure you have a compatible application server (e.g., WildFly, Payara, GlassFish).
2.  Set up the database as per `persistence.xml` and `cinema-ds.xml` configurations.
3.  Build the `.war` file (e.g., using Maven or your IDE).
4.  Deploy the `.war` file to your application server.

## Frontend (React)

The frontend is a single-page application built with React. It provides the user interface for browsing movies, selecting seats, and making reservations.

### Key Technologies:
-   React
-   JavaScript (ES6+)
-   CSS

### Setup & Running (Frontend)

1.  Navigate to the `Frontend` directory:
    ```bash
    cd Frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm start
    ```
    This will typically open the application in your default web browser at `http://localhost:3000`.

## Contributing
*(Details to be added if you plan to have contributors, e.g., coding standards, pull request process.)*

## License
*(Details to be added about the project's license, e.g., MIT, Apache 2.0.)*
