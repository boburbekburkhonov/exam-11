import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm"
import { CategoryEntity } from "./categories"
import { SubSubCategoryEntity } from "./sub.sub.category"

@Entity({
  name: "sub_categories",
})
export class SubCategoryEntity {
  @PrimaryGeneratedColumn("uuid", {
    name: "sub_category_id",
  })
  id: string

  @Column({
    name: "sub_category_title",
    type: "varchar",
    nullable: false,
  })
  title: string

  @ManyToOne(() => CategoryEntity, (category) => category.subCategories, {
    cascade: true,
    onDelete: "CASCADE",
    onUpdate: "NO ACTION",
  })
  category: CategoryEntity

  @OneToMany(() => SubSubCategoryEntity, (subSubCategory) => subSubCategory.subCategory)
  subSubCategories: SubSubCategoryEntity[]
}
