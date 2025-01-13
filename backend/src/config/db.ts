import { Ad } from "../entities/Ad"
import { Category } from "../entities/Category";
import { Tag } from "../entities/Tag";
import { DataSource } from "typeorm";
import { Picture } from "../entities/Picture";
import { User } from "../entities/User";


export const dataSourceGoodCorner = new DataSource({
    type: "postgres",
    host: "db",
    database:"postgres",
    username:"postgres",
    password:"password",
    entities: [Ad, Category, Tag, Picture, User],
    synchronize: true,
    logging: ["error", "query"]
})