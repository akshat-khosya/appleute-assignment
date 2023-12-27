import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { AuthService } from 'src/auth/auth.service';
import { AdminGuard } from 'src/auth/admin.guard';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from 'src/schema/product.schema';
import { User, UserSchema } from 'src/schema/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';
import { CartService } from './cart.service';
import { Cart, CartSchema } from 'src/schema/cart.schema';
import { AuthGuard } from 'src/auth/auth.guard';

@Module({
  controllers: [CartController],
  providers: [AuthService, AdminGuard, AuthGuard, CartService],
  imports: [
    MongooseModule.forFeature([
      { name: Cart.name, schema: CartSchema },
      { name: Product.name, schema: ProductSchema },
      { name: User.name, schema: UserSchema },
    ]),
    JwtModule,
    AuthModule,
  ],
})
export class CartModule {}
