## Description

A simple REST API for authentication using Node with Express, Typescript and Prisma ORM.

## Setup:

1. Rename `.env.template` to `.env`
1. Update the environment variables in the `.env` file
1. Build the image and run the container:
   ```bash
   $ docker compose up -d
   ```
1. Install dependencies:
   ```bash
   $ npm install
   ```
1. Run migrations:
   ```bash
   $ npm run prisma:run
   ```
1. Running the app:

   ```bash
   # development mode
   $ npm run dev

   # production mode
   $ npm run build
   $ npm start
   ```
