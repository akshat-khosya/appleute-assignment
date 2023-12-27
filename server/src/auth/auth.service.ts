import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { User, UserDocument } from './schema/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SignInUserDto } from './dto/signin-user.dto';
import { RequestUserDto } from './dto/request-user.dto';
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly configService: ConfigService,
    private jwtService: JwtService,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const user = await this.userModel.findOne({ email: createUserDto.email });
    if (user) {
      throw new ConflictException('Email already exists');
    }
    const saltOrRounds = this.configService.get<number>('saltRounds');
    createUserDto.password = await bcrypt.hash(
      createUserDto.password,
      saltOrRounds,
    );
    await this.userModel.create({
      ...createUserDto,
      createdAt: new Date(),
    });
  }

  async signIn(signInUserDto: SignInUserDto) {
    const { email, password } = signInUserDto;

    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new NotFoundException('Email not found');
    }
    if (!(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException();
    }
    const payload = { userId: user.id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async getProfile(requestUser: RequestUserDto) {
    const user = await this.userModel
      .findById(requestUser.userId)
      .select('name email')
      .exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return { user };
  }
  async getUser(requestUser: RequestUserDto) {
    const user = await this.userModel.findById(requestUser.userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return { user };
  }
}
