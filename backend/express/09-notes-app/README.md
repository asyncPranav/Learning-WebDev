# 🌿 Leafnote — Minimal Notes App

> A clean, fast, and beautifully designed notes web app built with **Node.js**, **Express.js**, **MongoDB**, and **EJS** — styled with **Tailwind CSS**.

## 📸 Preview

![Leafnote Preview](./Screenshots/leafnote01.png)
![Leafnote Preview](./Screenshots/leafnote02.png)
![Leafnote Preview](./Screenshots/leafnote03.png)

<br/>

## ✨ Features

- 📝 **Create, Read, Update, Delete** notes (full CRUD)
- 🌑 **Dark minimal UI** — easy on the eyes, built for focus
- 📱 **Fully responsive** — works on mobile, tablet, and desktop
- ⚡ **Fast & lightweight** — server-side rendered with EJS templates
- 🍃 **Leaf-themed design** — clean green accent, dark surfaces, subtle animations
- 🗃️ **MongoDB** persistent storage — your notes are always saved

<br/>

## 🛠️ Tech Stack

| Layer      | Technology              |
|------------|-------------------------|
| Runtime    | Node.js                 |
| Framework  | Express.js              |
| Database   | MongoDB + Mongoose      |
| Templating | EJS                     |
| Styling    | Tailwind CSS (CDN)      |
| Icons      | Font Awesome            |
| Font       | Geist (Google Fonts)    |

<br/>

## 🚀 Getting Started

### Prerequisites

- Node.js v18+
- MongoDB running locally

### Installation

```bash
# Clone the repository
git clone https://github.com/asyncpranav/leafnote.git
cd leafnote

# Install dependencies
npm install
```

### Run the app

```bash
node index.js
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

> Make sure MongoDB is running locally on `mongodb://localhost:27017` before starting the server.

<br/>

## 📁 Project Structure

```
09-notes-app/
├── index.js               # Express app — routes + server entry point
├── models/
│   └── notes.model.js     # Mongoose Note schema
├── views/
│   ├── home.ejs           # All notes listing
│   ├── new.ejs            # Create a new note
│   ├── edit.ejs           # Edit an existing note
│   ├── show.ejs           # View a single note
│   └── partials/
│       ├── header.ejs     # Navbar + global styles
│       └── footer.ejs     # Footer
├── package.json
└── package-lock.json
```

<br/>

## 🔗 Routes

| Method | Route            | Description              |
|--------|------------------|--------------------------|
| GET    | `/`              | List all notes           |
| GET    | `/new`           | Render create note form  |
| POST   | `/new`           | Save new note to DB      |
| GET    | `/view/:id`      | View a single note       |
| GET    | `/edit/:id`      | Render edit note form    |
| POST   | `/edit/:id`      | Update note in DB        |
| POST   | `/delete/:id`    | Delete note from DB      |

<br/>

## 🎨 Design

Leafnote follows a **dark minimal** design language:

- Background: `#191919` — warm near-black
- Surface: `#222224` — subtle card elevation
- Accent: `#4ade80` — natural green, matches the leaf theme
- Typography: Geist font — clean, readable, modern

<br/>

## 🙋‍♂️ Author

Built with 💚 by **Pranav** ([@asyncpranav](https://github.com/asyncpranav))

- 🐙 GitHub: [github.com/asyncpranav](https://github.com/asyncpranav)
- 💼 LinkedIn: [linkedin.com/in/asyncpranav](https://linkedin.com/in/asyncpranav)

<br/>

## 📄 License

MIT License — feel free to fork, modify, and use.

<br/>

## 🔖 Keywords

`nodejs notes app` · `express notes app` · `mongodb notes app` · `ejs notes app` · `tailwind dark theme` · `asyncpranav` · `asyncpranav projects` · `leafnote` · `minimal notes app` · `node express mongodb crud` · `dark notes webapp` · `asyncpranav github` · `express ejs crud app`

<br/>

⭐ If you found this useful, drop a star — it helps a lot!