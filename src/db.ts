import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { Profile } from "./entity/Profile";
import { Receta } from "./entity/Receta";
export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root", 
  password: "mysql",
  database: "recetas-db",
  // logging: true, // muestra peticiones a la bd
  synchronize: true,
  entities: [User, Receta, Profile],
});