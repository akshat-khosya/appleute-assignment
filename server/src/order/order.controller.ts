import {
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { RequestUserDto } from 'src/auth/dto/request-user.dto';

@UseGuards(AuthGuard)
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async createOrder(@Request() req) {
    const payload: RequestUserDto = req.user;
    return await this.orderService.create(payload);
  }

  @Get()
  async getAllOrders(@Request() req) {
    const payload: RequestUserDto = req.user;
    return await this.orderService.getAllOrder(payload);
  }
  @Get(':orderId')
  getOrderById(@Param('orderId') orderId: string, @Request() req) {
    const payload: RequestUserDto = req.user;
    return this.orderService.getOrderById(payload, orderId);
  }
}
