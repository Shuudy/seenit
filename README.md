# Seenit

**Seenit** is a YouTube-like video sharing web application with a modern, responsive UI built with **Next.js** and a backend API powered by **Laravel**.  
It features secure user authentication, video upload and streaming, as well as comments, likes, and subscriptions. 

The application is containerized with **Docker** for easy development and deployment.

## Main Features
- Modern, responsive UI built with **Next.js**
- User authentication and authorization (registration, login)
- Video upload, storage, and streaming
- Comments, likes, and subscriptions
- REST API implemented in **Laravel**

## Technologies
- **Next.js 15** (React-based frontend)
- **Laravel 12** (PHP-based backend API)
- **TailwindCSS** for styling
- **Docker** for containerized development

## Getting Started

The project includes **Docker** configurations to simplify setup and deployment.

### Requirements
- Docker installed and running
- (Optional) `docker-compose` command
- Node.js and npm for local frontend development (if not using Docker)
- PHP and Composer for backend dependencies (if not using Docker)

### Steps

#### Clone the repository:
```bash
git clone https://github.com/Shuudy/seenit.git
cd seenit
```

#### Using Docker (recommended)
```bash
docker compose up --build
```

This will:

1. Build the frontend and backend Docker images
2. Set up the database service
3. Expose ports:

   * Frontend: [http://localhost:3000](http://localhost:3000)
   * Backend API: [http://localhost:9000](http://localhost:9000)

#### Running Locally Without Docker

**Frontend:**

```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

**Backend:**

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve
```

Open [http://localhost:9000](http://localhost:9000)