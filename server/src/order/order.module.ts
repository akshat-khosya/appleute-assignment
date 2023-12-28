import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { AuthGuard } from 'src/auth/auth.guard';
import { AdminGuard } from 'src/auth/admin.guard';
import { AuthService } from 'src/auth/auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Cart, CartSchema } from 'src/schema/cart.schema';
import { Product, ProductSchema } from 'src/schema/product.schema';
import { User, UserSchema } from 'src/schema/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { Order, OrderSchema } from 'src/schema/order.schema';

@Module({
  providers: [OrderService, AuthService, AdminGuard, AuthGuard],
  controllers: [OrderController],
  imports: [
    MongooseModule.forFeature([
      { name: Order.name, schema: OrderSchema },
      { name: Cart.name, schema: CartSchema },
      { name: Product.name, schema: ProductSchema },
      { name: User.name, schema: UserSchema },
    ]),
    JwtModule,
  ],
})
export class OrderModule {}
