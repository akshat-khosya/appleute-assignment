import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { RequestUserDto } from 'src/auth/dto/request-user.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  createCart(@Body() createCartDto: CreateCartDto, @Request() req) {
    const payload: RequestUserDto = req.user;
    return this.cartService.createCart(payload, createCartDto);
  }
  @Get('product')
  getCartItemByProduct(@Query('productId') productId: string, @Request() req) {
    const payload: RequestUserDto = req.user;

    return this.cartService.getCartItemByProduct(payload, productId);
  }

  @Get()
  getCart(@Request() req) {
    const payload: RequestUserDto = req.user;
    return this.cartService.getAllItems(payload);
  }

  @Put(':productId')
  editCartItem(
    @Param('productId') productId: string,
    @Body('quantity') quantity: number,
    @Request() req,
  ) {
    const payload: RequestUserDto = req.user;
    return this.cartService.editCartItem(payload, productId, quantity);
  }

  @Delete(':productId')
  deleteCartItem(@Param('productId') productId: string, @Request() req) {
    const payload: RequestUserDto = req.user;
    return this.cartService.deleteCartItem(payload, productId);
  }

  @Delete()
  clearCart(@Request() req) {
    const payload: RequestUserDto = req.user;
    return this.cartService.clearCart(payload);
  }
}
