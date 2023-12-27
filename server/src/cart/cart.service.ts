import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cart, CartDocument } from 'src/schema/cart.schema';
import { CreateCartDto } from './dto/create-cart.dto';
import { RequestUserDto } from 'src/auth/dto/request-user.dto';
import { Product, ProductDocument } from 'src/schema/product.schema';
import { User, UserDocument } from 'src/schema/user.schema';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart.name)
    private readonly cartModel: Model<CartDocument>,
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async createCart(userRequest: RequestUserDto, createCartDto: CreateCartDto) {
    await this.checkUser(userRequest);
    await this.checkProduct(createCartDto.product);

    if (await this.getCartItemByProduct(userRequest, createCartDto.product)) {
      throw new ConflictException('Product already in cart');
    }

    return await this.cartModel.create({
      user: userRequest.userId,
      product: createCartDto.product,
      createdAt: new Date(),
    });
  }

  async getAllItems(userRequest: RequestUserDto) {
    await this.checkUser(userRequest);

    return await this.cartModel.find({ user: userRequest.userId }).exec();
  }

  async editCartItem(
    userRequest: RequestUserDto,
    productId: string,
    quantity: number,
  ) {
    await this.checkUser(userRequest);
    await this.checkProduct(productId);
    const cart = await this.cartModel.findOneAndUpdate(
      { user: userRequest.userId, product: productId },
      { $set: { totalItems: quantity, updatedAt: new Date() } },
      { new: true },
    );

    if (!cart) {
      throw new NotFoundException('Cart item not found');
    }

    return cart;
  }
  async deleteCartItem(userRequest: RequestUserDto, productId: string) {
    await this.checkUser(userRequest);
    await this.checkProduct(productId);

    const result = await this.cartModel.deleteOne({
      user: userRequest.userId,
      product: productId,
    });

    if (result.deletedCount === 0) {
      throw new NotFoundException('Cart item not found');
    }
  }

  async clearCart(userRequest: RequestUserDto) {
    this.checkUser(userRequest);

    await this.cartModel.deleteMany({ user: userRequest.userId });
  }

  async checkUser(userRequest: RequestUserDto) {
    const user = await this.userModel.findById(userRequest.userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
  }

  async checkProduct(productId: string) {
    const product = await this.productModel.findById(productId);
    if (!product) {
      throw new NotFoundException('Product not found');
    }
  }

  async getCartItemByProduct(userRequest: RequestUserDto, productId: string) {
    const cart = await this.cartModel.findOne({
      product: productId,
      user: userRequest.userId,
    });

    return cart;
  }
}
