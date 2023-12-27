import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from './auth.service';
import { SignInUserDto } from './dto/signin-user.dto';

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
}
