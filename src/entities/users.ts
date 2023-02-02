import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm'

@Entity({
  name: 'users'
})
export class UserEntity {
  @PrimaryGeneratedColumn('uuid', {
    name: 'user_id'
  })
  id: string;

  @Column({
    name: 'user_name',
    type: 'varchar',
    nullable: false
  })
  name: string;

  @Column({
    name: 'user_password',
    type: 'varchar',
    nullable: false
  })
  password: string;

  @Column({
    name: 'user_phone',
    type: 'varchar',
    nullable: false
  })
  phone: string;

  @Column({
    name: 'user_email',
    type: 'varchar',
    nullable: false
  })
  email: string;

  @CreateDateColumn({
    type: 'timestamptz',
  })
  created_at: string;
}