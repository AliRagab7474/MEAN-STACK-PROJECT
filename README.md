# MEAN Stack Project

A full-stack web application built with the **MEAN** stack:
- **M**ongoDB — Database
- **E**xpress.js — Backend framework
- **A**ngular — Frontend framework
- **N**ode.js — Runtime environment

## 📁 Project Structure

```
MEAN-STACK-PROJECT/
├── backend/          # Express.js REST API (Node.js)
│   ├── src/
│   ├── package.json
│   └── .gitignore
├── frontend/         # Angular application
│   ├── src/
│   ├── angular.json
│   ├── package.json
│   └── .gitignore
└── README.md
```

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (LTS version recommended)
- [Angular CLI](https://angular.dev/tools/cli) → `npm install -g @angular/cli`
- [MongoDB](https://www.mongodb.com/try/download/community) (local or Atlas connection)
- [Git](https://git-scm.com/)

### 1. Clone the repository

```bash
git clone https://github.com/AliRagab7474/MEAN-STACK-PROJECT.git
cd MEAN-STACK-PROJECT
```

### 2. Install backend dependencies

```bash
cd backend
npm install
```

### 3. Install frontend dependencies

```bash
cd ../frontend
npm install
```

### 4. Environment variables

Inside the `backend` folder, create a `.env` file with your own configuration, for example:

```
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

> ⚠️ Never commit your `.env` file. It's already excluded via `.gitignore`.

### 5. Run the project

**Backend** (runs on `http://localhost:3000`):
```bash
cd backend
npm run start:dev
```

**Frontend** (default Angular CLI setup, runs on `http://localhost:4200`):
```bash
cd frontend
ng serve
```

## 🔄 Git Workflow (Important)

To avoid losing anyone's work, **always `pull` before you `add`, `commit`, or `push`.**

```bash
# 1. Always start by pulling the latest changes
git pull origin main

# 2. Check what changed
git status

# 3. Stage your changes
git add .

# 4. Commit with a clear message
git commit -m "Describe what you changed"

# 5. Pull again before pushing (in case someone pushed while you were working)
git pull origin main

# 6. Push your changes
git push origin main
```

### If you get a merge conflict
1. Open the conflicting file(s) — Git marks conflicts with `<<<<<<<`, `=======`, `>>>>>>>`.
2. Manually decide which changes to keep.
3. Save the file, then:
   ```bash
   git add .
   git commit -m "Resolve merge conflict"
   git push origin main
   ```

### Golden rules
- ✅ `git pull` before you start working, and again right before `git push`.
- ✅ Commit often with clear, descriptive messages.
- ✅ Never push `node_modules/` or `.env` files (already handled by `.gitignore`).
- ❌ Don't force-push (`git push -f`) unless you fully understand the consequences.

## 🛠️ Tech Stack

| Layer      | Technology            |
|------------|------------------------|
| Frontend   | Angular                |
| Backend    | Node.js + Express.js   |
| Database   | MongoDB (Mongoose)     |
| Validation | Zod                    |

## 📄 License

This project is open source and available for learning purposes.
