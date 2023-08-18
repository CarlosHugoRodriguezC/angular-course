import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';

import * as bcrypt from 'bcryptjs';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload';
import { LoginResponse } from './interfaces/auth-response';
import { RegisterUserDto } from './dto/register-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const { password, ...userData } = createUserDto;

      const passwordHash = bcrypt.hashSync(password, 10);

      const newUser = new this.userModel({
        ...userData,
        password: passwordHash,
      });

      await newUser.save();

      const { ...resultUser } = newUser.toJSON();

      return resultUser;
    } catch (error) {
      Logger.error(error);

      if (error.code === 11000) {
        throw new BadRequestException(`${createUserDto.email} already exists`);
      }

      throw new InternalServerErrorException('Something went wrong');
    }
  }

  async register(registerUserDto: RegisterUserDto): Promise<LoginResponse> {
    const user = await this.create(registerUserDto);

    return {
      user,
      token: this.getJwtToken({ id: user._id }),
    };
  }

  async login(loginUserDto: LoginUserDto): Promise<LoginResponse> {
    const user = await this.userModel.findOne({ email: loginUserDto.email });

    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }

    const isMatch = bcrypt.compareSync(loginUserDto.password, user.password);

    if (!isMatch) {
      throw new BadRequestException('Invalid credentials');
    }

    return {
      user,
      token: this.getJwtToken({ id: user.id }),
    };
  }

  findAll() {
    return this.userModel.find();
  }

  async findOne(id: string) {
    const user = await this.userModel.findById(id);

    if (!user) {
      throw new BadRequestException('User not found');
    }

    return user.toJSON();
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const { ...userData } = updateUserDto;

    try {
      const user = await this.userModel.findByIdAndUpdate(id, userData, {
        new: true,
      });
      return user;
    } catch (error) {
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  async remove(id: string) {
    try {
      await this.userModel.findByIdAndDelete(id);
      return {
        message: `User with id: ${id} has been deleted`,
      };
    } catch (error) {
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }
}
