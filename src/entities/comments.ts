import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { ProductEntity } from "./products"
import { UserEntity } from "./users"

@Entity({
  name: "comments",
})
export class CommentsEntity {
  @PrimaryGeneratedColumn("uuid", {
    name: "comment_id",
  })
  id: string

  @Column({
    name: "comment_title",
    type: "varchar",
    nullable: false,
  })
  title: string

  @ManyToOne(() => ProductEntity, (product) => product.comments, {
    cascade: true,
    onDelete: "CASCADE",
    onUpdate: "NO ACTION",
  })
  product: ProductEntity

  @ManyToOne(() => UserEntity, (user) => user.comments, {
    cascade: true,
    onDelete: "CASCADE",
    onUpdate: "NO ACTION",
  })
  user: UserEntity
}
