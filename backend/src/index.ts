import "reflect-metadata";
import express from "express";
import { dataSourceGoodCorner } from "./config/db";
import { Ad } from "./entities/Ad";
import { validate } from "class-validator";

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Hello World!");
});

app.get("/ads", async (_req, res) => {
  const ads = await Ad.find()
  res.send(ads);
})

app.post("/ads", async (req, res) => {
  const ad = new Ad();
  ad.title = req.body.title;
  ad.description = req.body.description;
  ad.owner = req.body.owner;
  ad.price = req.body.price;
  ad.picture = req.body.picture;
  ad.location = req.body.location;
  ad.createdAt = new Date();

  const errors = await validate(ad);
  if (errors.length > 0) {
    console.log(errors);
    res.status(400).send("La description doit faire entre 10 et 100 caractères")
  } else {
    const result = await ad.save()
    res.send(JSON.stringify(result));
  }
});

app.delete("/ads/:id", async (req, res) => {
  const result = await Ad.delete(req.params.id);
  console.log(result);
  res.send("Annonce supprimée avec succès")
});

app.put("/ads/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    let ad = await Ad.findOneByOrFail({ id })
    ad = Object.assign(ad, req.body);
    const result = await ad.save();
    console.log(result);
    res.send("Ad has been updated");
  } catch (err) {
    console.log(err);
    res.status(400).send("Invalid request");
  }
});

app.listen(port, async () => {
  await dataSourceGoodCorner.initialize();
  console.log(`Example app listening on port ${port}`)
});