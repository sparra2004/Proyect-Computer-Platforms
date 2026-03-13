import { Conductor } from "src/conductores/entities/conductore.entity";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";


@Entity()
export class Vehiculo {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  placa: string;

  @Column()
  modelo: string;

  @Column()
  tarjetaDePropiedad: boolean;

  @Column()
  soat: boolean;

  @Column()
  color: string;

  @ManyToOne(() => Conductor)
  @JoinColumn({ name: "conductor_id" })
  conductor: Conductor;

}
