import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { User } from "../../users/entities/user.entity";
import { Conductor } from "../../conductores/entities/conductore.entity";
import { Vehiculo } from "../../vehiculos/entities/vehiculo.entity";




@Entity()
export class Viaje {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  inicio!: string;

  @Column()
  final!: string;

  @ManyToOne(() => User, (user) => user.viajes)
  @JoinColumn({ name: "user_id" })
  user!: User;

  @ManyToOne(() => Conductor, (conductor) => conductor.viajes)
  @JoinColumn({ name: "conductor_id" })
  conductor!: Conductor;

  @ManyToOne(() => Vehiculo)
  @JoinColumn({ name: "vehiculo_placa" })
  vehiculo!: Vehiculo;

  @Column({ nullable: true })
  fecha!: string;

  @Column({ nullable: true })
  hora!: string;
}
