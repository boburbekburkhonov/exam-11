import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, CreateDateColumn, ManyToMany } from "typeorm"
import { CommentsEntity } from "./comments"
import { SubSubCategoryEntity } from "./sub.sub.category"
import { UserEntity } from "./users"

@Entity({
  name: "products",
})
export class ProductEntity {
  @PrimaryGeneratedColumn("uuid", {
    name: "product_id",
  })
  id: string

  @Column({
    name: "product_title",
    type: "varchar",
    nullable: false,
  })
  title: string

  @Column({
    name: "product_price",
    type: "varchar",
    nullable: false,
  })
  price: string

  @Column({
    name: "product_author",
    type: "varchar",
    nullable: true,
  })
  author: string

  @Column({
    name: "product_desc",
    type: "varchar",
    nullable: true,
  })
  desc: string

  @Column({
    name: "product_lang",
    type: "varchar",
    nullable: true,
  })
  lang: string

  @Column({
    name: "product_made",
    type: "varchar",
    nullable: true,
  })
  made: string

  @Column({
    name: "product_brand",
    type: "varchar",
    nullable: true,
  })
  brand: string

  @Column({
    name: "product_color",
    type: "varchar",
    nullable: true,
  })
  color: string

  @Column({
    name: "product_status",
    type: "varchar",
    nullable: false,
  })
  status: string

  @Column({
    name: "product_rate",
    type: "int",
    nullable: false,
  })
  rate: number

  @Column({
    name: "product_img",
    type: "varchar",
    nullable: true,
  })
  img: string

  @CreateDateColumn({
    type: "timestamptz",
  })
  created_at: string

  @ManyToOne(() => SubSubCategoryEntity, (categories) => categories.products, {
    cascade: true,
    onDelete: "CASCADE",
    onUpdate: "NO ACTION",
  })
  category: SubSubCategoryEntity

  @OneToMany(() => CommentsEntity, (comment) => comment.product)
  comments: CommentsEntity[]

  @ManyToMany(() => UserEntity, (user) => user.products, {
    cascade: true,
    onDelete: "CASCADE",
    onUpdate: "NO ACTION",
  })
  users: UserEntity[]
}
