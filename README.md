# Sara7a

Sara7a is a full-stack anonymous messaging platform that allows users to create profiles, share them with others, and receive anonymous messages.

The platform also includes a reporting and moderation system that allows users to report inappropriate messages and gives administrators the ability to review reports and take appropriate actions.

## Features

### User Features

* Register and Login
* JWT Authentication
* View and Update Profile
* Share Profile
* Send Anonymous Messages
* Receive Messages
* Delete Received Messages
* Report Inappropriate Messages
* View Submitted Reports
* Blocked users cannot send messages or share their profiles

### Admin Features

* View All Users
* Block and Unblock Users
* View All Reports
* View Report Details
* Delete Reported Messages
* Ban Message Senders
* Dismiss Reports

## Report System

Users can report inappropriate messages by providing a reason and optional description.

Administrators can review each report and choose one of the following actions:

* **Delete Message** — Soft deletes the reported message.
* **Ban Sender** — Blocks the sender and soft deletes the message.
* **Dismiss Report** — Closes the report without taking action.

Reports have different statuses:

```text
Pending → Resolved
Pending → Dismissed
```

## Technologies

### Frontend

* Angular
* TypeScript
* HTML
* CSS

### Backend

* Node.js
* Express.js
* JavaScript
* Mongoose

### Database

* MongoDB

### Authentication & Security

* JWT
* Role-Based Authorization
* Protected Routes

### Tools

* Git & GitHub
* Postman

## System Architecture

```text
Angular Frontend
       ↓
    REST API
       ↓
Node.js + Express
       ↓
     Mongoose
       ↓
     MongoDB
```

## Main Entities

### User

Stores user information, authentication data, role, and account status.

### Message

Stores the message content, sender, receiver, creation date, and deletion status.

### Report

Stores the reported message, reporter, sender, reason, description, report status, and admin action.

```text
User
 ├── sends → Message
 ├── receives → Message
 └── creates → Report

Message
 └── can be reported → Report
```

## Authentication & Authorization

The application uses JWT-based authentication to protect private routes.

Authorization is role-based:

```text
User
 └── Access User Features

Admin
 └── Access Admin Features
```

Sensitive operations such as managing reports, blocking users, and taking moderation actions are restricted to administrators.

## Soft Delete

Messages are not permanently removed from the database when deleted.

Instead, the system uses:

```js
isDeleted: true
```

This allows administrators to access reported message information when reviewing reports while keeping deleted messages hidden from normal users.

## API Overview

### Authentication

```text
POST /auth/register
POST /auth/login
```

### Messages

```text
POST   /message/:receiverId
GET    /message
DELETE /message/:messageId
```

### Reports

```text
POST  /report/:messageId/report-message
GET   /report/all-reports
GET   /report/:reportId/get-report-details
PATCH /report/:reportId/report-patch
GET   /report/get-my-reports
```

### Users

```text
GET   /user/profile
DELETE /user/profile
GET   /user
PATCH /user/:id/block
PATCH /user/:id/unblock
```

## Project Goal

The goal of Sara7a is to provide a simple anonymous messaging experience while maintaining a moderation system that helps administrators handle inappropriate content and manage platform users.

## Team

Developed as part of the **NTI MEAN Stack Training**.

---

## License

This project is developed for educational and training purposes.
