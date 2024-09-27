import "reflect-metadata";
import express from "express";
import { dataSourceGoodCorner } from "./config/db";
import { Ad } from "./entities/Ad";
import { validate } from "class-validator";
import { Category } from "./entities/Category";
import { Like } from "typeorm";
import { Tag } from "./entities/Tag";

const app = express();
const port = 3000;

app.use(express.json());

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
      relations: { category: true, tags: true  },
    });
  } else {
    ads = await Ad.find({ relations: { category: true, tags: true } });
  }
  res.send(ads);
});

app.get("/ads/", async (_req, res) => {
  const ads = await Ad.find({ relations: ["category"] });
  res.send(ads);
})

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

app.post("/ads", async (req, res) => {
  const ad = new Ad();
  ad.title = req.body.title;
  ad.description = req.body.description;
  ad.owner = req.body.owner;
  ad.price = req.body.price;
  ad.picture = req.body.picture;
  ad.location = req.body.location;
  ad.createdAt = new Date();
  ad.category = req.body.categoryId ? req.body.categoryId : 1;
  ad.tags = req.body.tags;

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
    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(400).send("Invalid request");
  }
});

app.post("/tags", async (req, res) => {
  const tag = new Tag();

  tag.name = req.body.name;

  const result = await tag.save();
  res.send(JSON.stringify(result))
})

app.listen(port, async () => {
  await dataSourceGoodCorner.initialize();
  console.log(`Example app listening on port ${port}`)
});