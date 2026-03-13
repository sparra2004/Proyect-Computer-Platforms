import { Viaje } from "src/viajes/entities/viaje.entity";
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";


@Entity()
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  age: number;

  @Column({ unique: true })
  telefono: string;

  @OneToMany(() => Viaje, (viaje) => viaje.user)
  viajes: Viaje[];

}
