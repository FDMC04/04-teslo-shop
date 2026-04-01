import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductImage } from './product-image.entity';
import { User } from 'src/auth/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'products' })
export class Product {
  @ApiProperty({
    example: '01ac6e05-b522-45e0-89bf-f80644fcf0bf',
    description: 'Product ID',
    uniqueItems: true,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @ApiProperty({
    example: 'Kids Racing Stripe Tee',
    description: 'Product Title',
    uniqueItems: true,
  })
  @Column('text', {
    unique: true,
  })
  title: string;
  @ApiProperty({
    example: 30,
    description: 'Product Price',
  })
  @Column('float', {
    default: 0,
  })
  price: number;
  @ApiProperty({
    example:
      'The refreshed Kids Racing Stripe Tee is made from 100% Peruvian cotton.',
    description: 'Product Description',
    default: null,
  })
  @Column({
    type: 'text',
    nullable: true,
  })
  description: string;
  @ApiProperty({
    example: 'kids_racing_stripe_tee',
    description: 'Product SLUG - for SEO',
    uniqueItems: true,
  })
  @Column('text', {
    unique: true,
  })
  slug: string;
  @ApiProperty({
    example: 10,
    description: 'Product Stock',
    default: 0,
  })
  @Column('int', {
    default: 0,
  })
  stock: number;
  @ApiProperty({
    example: ['M', 'XL', 'XXL'],
    description: 'Product Sizes',
  })
  @Column('text', {
    array: true,
  })
  sizes: string[];
  @ApiProperty({
    example: ['men', 'women', 'kid'],
    description: 'Product Gender',
  })
  @Column('text')
  gender: string;
  @ApiProperty({
    example: ['shirt'],
    description: 'Product Tags',
  })
  @Column('text', {
    array: true,
    default: [],
  })
  tags: string[];
  // Images
  @ApiProperty({
    example: '1740176-00-A_0_2000.jpg',
    description: 'Product Image',
  })
  @OneToMany(() => ProductImage, (productImage) => productImage.product, {
    cascade: true,
    eager: true,
  })
  images?: ProductImage[];

  @ManyToOne(() => User, (user) => user.product, { eager: true })
  user: User;

  @BeforeInsert()
  checkSlukInsert() {
    if (!this.slug) {
      this.slug = this.title;
    }
    this.slug = this.slug
      .toLocaleLowerCase()
      .replaceAll(' ', '_')
      .replaceAll("'", '');
  }

  @BeforeUpdate()
  checkSlukUpdate() {
    this.slug = this.slug
      .toLocaleLowerCase()
      .replaceAll(' ', '_')
      .replaceAll("'", '');
  }
}
