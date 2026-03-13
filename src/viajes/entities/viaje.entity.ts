import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Vehiculo } from "src/vehiculos/entities/vehiculo.entity";
import { User } from "src/users/entities/user.entity";
import { Conductor } from "src/conductores/entities/conductore.entity";


@Entity()
export class Viaje {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  inicio: string;

  @Column()
  final: string;

  @ManyToOne(() => User, (user) => user.viajes)
  @JoinColumn({ name: "user_id" })
  user: User;

  @ManyToOne(() => Conductor, (conductor) => conductor.viajes)
  @JoinColumn({ name: "conductor_id" })
  conductor: Conductor;

  @ManyToOne(() => Vehiculo)
  @JoinColumn({ name: "vehiculo_placa" })
  vehiculo: Vehiculo;

}
