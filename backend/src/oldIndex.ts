import "reflect-metadata";
import express from "express";
import cors from "cors";
import { dataSourceGoodCorner } from "./config/db";
import { Ad } from "./entities/Ad";
import { validate } from "class-validator";
import { Category } from "./entities/Category";
import { Like } from "typeorm";
import { Tag } from "./entities/Tag";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.listen(port, async () => {
  await dataSourceGoodCorner.initialize();
  console.log(`Example app listening on port ${port}`);
});

app.get("/", (_req, res) => {
  res.send("Hello World!");
});

app.get("/ads", async (req, res) => {
  let ads: Ad[];
  if (req.query.category) {
    ads = await Ad.find({
      where: {
        category: { name: req.query.category as string },
      },
      relations: { tags: true }
    });
  } else if (req.query.title) {
    ads = await Ad.find({
      where: {
        title: Like(`${req.query.title as string}%`),
      },
    });
  } else {
    ads = await Ad.find({
      relations: { tags: true },
      order: { id: "DESC" }
    });
  }
  res.send(ads);
});

app.get("/ad/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    let ad = await Ad.findOneByOrFail({ id: id });
    res.send(ad);
  } catch (err) {
    console.log(err);
    res.status(400).send("Invalid request");
  }
});

app.get("/ads/", async (_req, res) => {
  const ads = await Ad.find({ relations: ["category"] });
  res.send(ads);
});

app.post("/ads", async (req, res) => {
  const ad = new Ad();
  ad.title = req.body.title;
  ad.description = req.body.description;
  ad.owner = req.body.owner;
  ad.price = req.body.price;
  ad.picture = req.body.picture;
  ad.location = req.body.location;
  ad.createdAt = new Date();
  ad.category = req.body.category ? req.body.category : 1;
  ad.tags = req.body.tags;

  const errors = await validate(ad);
  if (errors.length > 0) {
    console.log(errors);
    res
      .status(400)
      .send("La description doit faire entre 10 et 100 caractères");
  } else {
    try {
      const result = await ad.save();
      res.send(JSON.stringify(result));
    } catch (err) {
      console.log("err", err);
    }
  }
});

app.put("/ad/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    let ad = await Ad.findOneByOrFail({ id });
    ad = Object.assign(ad, req.body);
    const result = await ad.save();
    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(400).send("Invalid request");
  }
});

app.delete("/ad/:id", async (req, res) => {
  const result = await Ad.delete(req.params.id);
  console.log(result);
  res.send("Annonce supprimée avec succès");
});

// CATEGORIES
app.get("/categories", async (req, res) => {
  let categories: Category[];
  if (req.query.name) {
    categories = await Category.find({
      where: {
        name: Like(`${req.query.name as string}%`),
      },
    });
  } else {
    categories = await Category.find();
  }
  res.send(categories);
});

app.get("/category/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    let category = await Category.findOneByOrFail({ id: id });
    res.send(category);
  } catch (err) {
    console.log(err);
    res.status(400).send("Invalid request");
  }
});

app.post("/categories", async (req, res) => {
  try {
    const category = new Category();
    category.name = req.body.name;
    const result = await category.save();
    res.send(JSON.stringify(result));
  } catch (err) {
    console.log("err", err)
  }
});

app.delete("/categories/:id", async (req, res) => {
  const result = await Category.delete(req.params.id);
  console.log(result);
  res.send("Catégorie supprimée avec succès");
});

// TAGS
app.get("/tags", async (req, res) => {
  let tags: Tag[];
  if (req.query.name) {
    tags = await Tag.find({
      where: {
        name: Like(`${req.query.name as string}%`),
      },
    });
  } else {
    tags = await Tag.find();
  }
  res.send(tags);
});

app.post("/tags", async (req, res) => {
  const tag = new Tag();
  tag.name = req.body.name;

  const result = await tag.save();
  res.send(JSON.stringify(result));
});

app.put("/tags/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    let tag = await Tag.findOneByOrFail({ id });
    tag = Object.assign(tag, req.body);
    const result = await tag.save();
    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(400).send("Invalid request");
  }
});

app.delete("/tags/:id", async (req, res) => {
  const result = await Tag.delete(req.params.id);
  console.log(result);
  res.send("Tag supprimée avec succès");
});
