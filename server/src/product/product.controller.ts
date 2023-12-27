import { Body, Controller, Post, UseGuards } from '@nestjs/common';
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
}
