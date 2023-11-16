import {Entity,Column, PrimaryGeneratedColumn,BaseEntity,CreateDateColumn,UpdateDateColumn, OneToOne, JoinColumn, OneToMany} from "typeorm";
import { Profile } from "./Profile"
import { Receta } from "./Receta"

  @Entity() // se puede pasar como parametro el nombre de tabla ej: 'usersTable'

  export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;
  
    @Column()
    password: string;
  
    @Column({ default: true })
    active: boolean;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
    
    @OneToOne(() => Profile)
    @JoinColumn()
    profile: Profile;

    @OneToMany(() => Receta, (receta) => receta.user)
    recetas: Receta[]


  }
