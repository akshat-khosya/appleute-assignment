import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from 'src/schema/product.schema';
import { JwtModule } from '@nestjs/jwt';
import { AdminGuard } from 'src/auth/admin.guard';
import { AuthService } from 'src/auth/auth.service';
import { AuthModule } from 'src/auth/auth.module';
import { User, UserSchema } from 'src/schema/user.schema';

@Module({
  controllers: [ProductController],
  providers: [ProductService, AuthService, AdminGuard],
  imports: [
    MongooseModule.forFeature([
      { name: Product.name, schema: ProductSchema },
      { name: User.name, schema: UserSchema },
    ]),
    JwtModule,
    AuthModule,
  ],
})
export class ProductModule {}
