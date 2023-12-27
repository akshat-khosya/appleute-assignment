import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from './auth.service';
import { SignInUserDto } from './dto/signin-user.dto';
import { AuthGuard } from './auth.guard';
import { RequestUserDto } from './dto/request-user.dto';
import { AdminGuard } from './admin.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto);
    await this.authService.create(createUserDto);
  }

  @Post('login')
  async signIn(@Body() signInUserDto: SignInUserDto) {
    console.log(signInUserDto);
    return await this.authService.signIn(signInUserDto);
  }

  @UseGuards(AuthGuard)
  @Get('auto-login')
  async autoLogin(@Request() req) {
    const payload: RequestUserDto = req.user;
    return await this.authService.getProfile(payload);
  }

  @UseGuards(AuthGuard, AdminGuard)
  @Get('all-users')
  async getAllUsers() {
    return await this.authService.getAllUser();
  }
}
