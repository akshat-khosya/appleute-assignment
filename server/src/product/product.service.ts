import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from 'src/schema/product.schema';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    await this.productModel.create({
      ...createProductDto,
      createdAt: new Date(),
    });
  }

  async getProducts(page: number, pageSize: number, category?: string) {
    page = parseInt(String(page), 10) || 1;
    pageSize = parseInt(String(pageSize), 10) || 10;
    const query = category ? { category } : {};
    const products = await this.productModel
      .find(query)
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .exec();
    return { products, skip: (page - 1) * pageSize, limit: pageSize };
  }

  async getProductById(productId: string): Promise<Product | null> {
    return this.productModel.findById(productId).exec();
  }

  async getUniqueCategories(): Promise<string[]> {
    const categories = await this.productModel.distinct('category').exec();
    return categories;
  }
}
