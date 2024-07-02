# Medium Clone

## Description

This project is a Medium clone web application built with modern technologies. It includes React for the frontend, Cloudflare Workers for the backend, and PostgreSQL as the database. The project uses Prisma as the ORM with connection pooling, Zod for validation and type inference, and JWT for authentication.

## Technologies

- **Frontend:** React, TypeScript, Zod
- **Backend:** Cloudflare Workers, TypeScript
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Authentication:** JWT

## Features

- User authentication and authorization with JWT
- CRUD operations for blogs
- View blogs by other users

## Setup

### Prerequisites

- Node.js
- npm or yarn
- PostgreSQL

### Backend Configuration

1. Modify the `wrangler.toml` file in the root of your backend project with the following content:

    ```toml
    name = "medium_clone"
    type = "javascript"

    [env.production]
    vars = { DATABASE_URL = "your_database_url" }
    ```

2. Create a `.env` file in the root of your backend project for local testing:

    ```env
    DATABASE_URL=your_local_database_url
    JWT_SECRET=your_local_jwt_secret
    ```

3. Install dependencies and set up the database:

    ```sh
    npm install
    npx prisma migrate dev --name init_schema
    npx prisma generate --no-engine
    npm install @prisma/extension-accelerate
    npm run deploy
    ```

### Frontend Configuration

1. Navigate to the frontend directory and install dependencies:

    ```sh
    npm install
    ```

2. Start the development server:

    ```sh
    npm run dev
    ```

## Database Connection Pooling

To avoid connection pooling issues in development mode, ensure the `DATABASE_URL` in your `.env` file does not use pooling.

Make sure to set the following environment variables in your `wrangler.toml` and `.env` files:

- `DATABASE_URL`: The URL of your PostgreSQL database.
- `JWT_SECRET`: The secret key used for JWT authentication.

## License

[Specify your license here]
