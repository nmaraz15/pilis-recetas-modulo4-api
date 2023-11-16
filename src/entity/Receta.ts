import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

import { User } from "./User"



@Entity() // se puede pasar como parametro el nombre de tabla ej: 'RecetaTable'
export class Receta extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  descripcion: string;

  @Column()
  foto: string;

  @Column()
  ingredientes: string;

  @Column()
  preparacion: string;

  @Column()
  tiempo: string;

  @Column({ default: true })
  active: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.recetas)
  user: User

}