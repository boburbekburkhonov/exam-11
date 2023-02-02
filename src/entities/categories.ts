import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { SubCategoryEntity } from './sub.category';

@Entity({
  name: 'categories'
})
export class CategoryEntity {
  @PrimaryGeneratedColumn('uuid', {
    name: 'category_id'
  })
  id: string;

  @Column({
    name: 'category_title',
    type: 'varchar',
    nullable: false
  })
  title: string;

  @OneToMany(() => SubCategoryEntity, subCategory => subCategory.category, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: "NO ACTION"
  })
  subCategories: SubCategoryEntity[]
}