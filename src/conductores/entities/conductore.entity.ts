import { Viaje } from "src/viajes/entities/viaje.entity";
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";


@Entity()
export class Conductor {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  telefono: string;

  @Column()
  licencia: boolean;

  @OneToMany(() => Viaje, (viaje) => viaje.conductor)
  viajes: Viaje[];

}
