import express from "express";
import sqlite3 from 'sqlite3';

const dbPath = './sql/good_corner.sqlite'
const db = new sqlite3.Database(dbPath);

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.get("/ads", (_req, res) => {
  db.all("SELECT * from ad", (err, rows) => {
    if (err) {
      console.log(err)
    } else {
      res.send(rows)
    }
  })
})

app.post("/ads", (req, res) => {
  const stmt = db.prepare(
    "INSERT INTO ad (title, description, owner, price, picture, location, createdAt) VALUES (?, ?, ?, ?, ?, ?, DATETIME('now'))"
  );

  stmt.run([
    req.body.title,
    req.body.description,
    req.body.owner,
    req.body.price,
    req.body.picture,
    req.body.location,
    req.body.createdAt
  ], err => {
    if (err) {
      console.log(err);
    } else {
      res.send("Annonce ajouté avec succès")
    }
  });
});

app.delete("/ads/:id", (req, res) => {
  const id = req.params.id;
  const stmt = db.prepare("DELETE FROM ad WHERE id = ?");
  stmt.run(id, err => {
    if (err) {
      console.log(err);
    } else {
      res.send("Annonce supprimée avec succès")
    }
  });
});

app.put("/ads/:id", (req, res) => {
  const stmt = db.prepare(
    "UPDATE ad SET title = ?, description = ?, owner = ?, price = ?, picture = ?, location = ?, createdAt = ? WHERE id = ?"
  );

  stmt.run([
    req.body.title,
    req.body.description,
    req.body.owner,
    req.body.price,
    req.body.picture,
    req.body.location,
    req.body.createdAt,
    req.params.id
  ], err => {
    if (err) {
      console.log(err);
    } else {
      res.send("Annonce modifié avec succès")
    }
  })
});