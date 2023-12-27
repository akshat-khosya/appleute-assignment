import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductService } from './product.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { AdminGuard } from 'src/auth/admin.guard';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(AuthGuard, AdminGuard)
  @Post()
  async create(@Body() createProductDto: CreateProductDto[]) {
    console.log(createProductDto);
    const createProductPromises = createProductDto.map(
      async (product: CreateProductDto) => {
        const newProduct = new CreateProductDto();
        Object.assign(newProduct, product);
        return await this.productService.create(newProduct);
      },
    );

    await Promise.all(createProductPromises);
  }

  @UseGuards(AuthGuard)
  @Get()
  async getProducts(
    @Query('page') page?: number,
    @Query('pageSize') pageSize?: number,
    @Query('category') category?: string,
  ) {
    return await this.productService.getProducts(page, pageSize, category);
  }

  @UseGuards(AuthGuard)
  @Get('details')
  async getProductDetails(@Query('productId') productId: string) {
    const product = await this.productService.getProductById(productId);
    return product;
  }

  @UseGuards(AuthGuard)
  @Get('categories')
  async getUniqueCategories() {
    const categories = await this.productService.getUniqueCategories();
    return categories;
  }
}
