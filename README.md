# Binge

Binge is a website that combines elements of IMDB and social media to create a platform where users can rate, comment, review, discuss movies, and share their opinions. Users can also add movies to their watched list, watchlist, and favorites. The website incorporates features such as pagination, lazy loading, community chat, and email verification. It also includes an admin panel for managing users, posts, reports, and monitoring activities.

## Live Site

You can access the live site at [https://binge-chat.netlify.app/](https://binge-chat.netlify.app/).

## Demo Account

To explore the website, you can use the following dummy account:

- Email: muhsin@gmail.com
- Password: Pa$$w0rd!

## Technologies Used

- Front-end:
  - React.js
  - Redux for state management
  - React Router for navigation
  - Firebase to store images
  - Firestore for realtime chat
  - Socket.io for real-time updates
  - HTML, CSS, and JavaScript

- Back-end:
  - Node.js and Express.js
  - MongoDB for the database
  - Mongoose for object modeling
  - Socket.io for real-time communication

## Project Structure

The project follows a directory structure with separate directories for the client, admin, and server.

- `client`: Contains the front-end code for the user-facing website.
- `admin`: Contains the front-end code for the admin panel.
- `server`: Contains the back-end API code.

## Local Development

To run the project locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone <repository_url>

2. Install Dependencies
    cd client
    npm install

    cd ../admin
    npm install

    cd ../server
    npm install

3. create .env at server with variables
    [MONGO_URL, PORT, JWT_SECRET_KEY, BASE_URL, HOST, SERVICE, EMAIL_PORT, SECURE, USER, PASS]

4. start server
    cd server
    npm start

5. start client and admin
    cd client
    npm run dev

    cd ../admin
    npm run dev