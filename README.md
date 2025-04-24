# IT Ticketing System

A simple full-stack ticketing system for managing user-submitted issues. Built with:

- React (frontend)
- Express + Node.js (backend)
- PostgreSQL (database)

---

## Features

- User page to submit tickets (title, description, priority)
- Admin page to:
    - View all tickets
    - Edit ticket status, priority, or details
    - Delete tickets
- Stores data in a PostgreSQL database
- Built with clean separation between frontend and backend

---

## Project Structure

```
TicketSystem/
├── backend/         # Express backend
│   ├── server.js
│   └── .env
├── frontend/        # React frontend
│   ├── src/
│   │   ├── App.js
│   │   ├── UserPage.js
│   │   └── AdminPage.js
```

---

## Setup Instructions

### 1. Clone the Repo

```bash
git clone https://github.com/your-username/ticket-system.git
cd ticket-system
```

---

### 2. Set Up PostgreSQL

Create a database named `db` and run:

```sql
CREATE TABLE tickets (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255),
  description TEXT,
  priority VARCHAR(50) DEFAULT 'Medium',
  status VARCHAR(50) DEFAULT 'Open',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

Optional: add a trigger to update `updated_at`.

---

### 3. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:

```env
DATABASE_URL=postgres://postgres:yourpassword@localhost:5432/db
PORT=3001
```

Then run:

```bash
node server.js
```

---

### 4. Frontend Setup

```bash
cd ../frontend
npm install
npm start
```

Frontend will run at `http://localhost:3000`

---

## Pages

| Page         | URL                     | Access       |
|--------------|--------------------------|--------------|
| User Page    | `http://localhost:3000/user`   | Create tickets |
| Admin Page   | `http://localhost:3000/admin`  | Manage tickets |

---

## Future Improvements

- Authentication (login for admin)
- Pagination and search
- File uploads and comments on tickets

---

## License

MIT

