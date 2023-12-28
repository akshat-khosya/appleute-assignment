import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { RequestUserDto } from 'src/auth/dto/request-user.dto';
import { Cart, CartDocument } from 'src/schema/cart.schema';
import { Order, OrderDocument } from 'src/schema/order.schema';
import { Product, ProductDocument } from 'src/schema/product.schema';
import { User, UserDocument } from 'src/schema/user.schema';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name)
    private readonly orderModel: Model<OrderDocument>,
    @InjectModel(Cart.name)
    private readonly cartModel: Model<CartDocument>,
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async create(userRequest: RequestUserDto) {
    const cartItems = await this.cartModel.find({
      user: new mongoose.Types.ObjectId(userRequest.userId),
    });
    if (cartItems.length === 0) {
      throw new NotFoundException('Cart is empty');
    }
    const orderProducts = cartItems.map((item) => ({
      productId: new mongoose.Types.ObjectId(item.product),
      itemCount: item.totalItems,
    }));
    await this.orderModel.create({
      products: orderProducts,
      user: new mongoose.Types.ObjectId(userRequest.userId),
      createdAt: new Date(),
    });
    await this.cartModel.deleteMany({ user: userRequest.userId });
  }

  async getAllOrder(userRequest: RequestUserDto) {
    const orders = await this.orderModel
      .find({
        user: new mongoose.Types.ObjectId(userRequest.userId),
      })
      .populate({ path: 'products.productId' });

    console.log(orders);
    return orders;
  }
  async getOrderById(userRequest: RequestUserDto, orderId: string) {
    const order = await this.orderModel
      .find({
        user: new mongoose.Types.ObjectId(userRequest.userId),
        _id: new mongoose.Types.ObjectId(orderId),
      })
      .populate({ path: 'products.productId', select: '-__v' })
      .select('-user -__v');

    console.log(order);
    return order;
  }
}
