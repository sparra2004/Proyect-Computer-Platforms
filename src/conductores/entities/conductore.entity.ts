import { Viaje } from "src/viajes/entities/viaje.entity";
import { Entity, Column, PrimaryColumn, OneToMany } from "typeorm";


@Entity()
export class Conductor {

  @PrimaryColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ unique: true })
  telefono!: string;

  @Column()
  licencia!: boolean;

  @OneToMany(() => Viaje, (viaje) => viaje.conductor)
  viajes!: Viaje[];

}
