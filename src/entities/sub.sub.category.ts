import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm'
import { CategoryEntity } from './categories';
import { ProductEntity } from './products';
import { SubCategoryEntity } from './sub.category';

@Entity({
  name: 'sub_sub_categories'
})
export class SubSubCategoryEntity {
  @PrimaryGeneratedColumn('uuid', {
    name: 'sub_sub_category_id'
  })
  id: string;

  @Column({
    name: 'sub_sub_category_title',
    type: 'varchar',
    nullable: false
  })
  title: string;

  @ManyToOne(() => SubCategoryEntity, subCategory => subCategory.subSubCategories)
  subCategory: SubCategoryEntity;

  @OneToMany(() => ProductEntity, product => product.category, {
    cascade: true,
    onDelete: "CASCADE",
    onUpdate: "NO ACTION",
  })
  products: ProductEntity[]
}