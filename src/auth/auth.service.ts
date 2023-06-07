import { Model } from 'mongoose';
import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';

import { User } from './entities/user.entity';
import { CreateUserDto, LoginUserDto } from './dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  
  constructor(
    
    @InjectModel( User.name )
    private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,

  ) {}
  
  async create(createUserDto: CreateUserDto):Promise<User> {
    try {
      
      const { password, ...userData } = createUserDto;
      const user = await this.userModel.create( { ...userData, password: bcrypt.hashSync( password, 10 ) });
      delete user.password;
      return {
      ...user, 
      token: this.getJwtToken({ email: user.email})
      };
      
    } catch (error) {
      this.handleDBErrors(error)
    }
  }
  
  async login(loginUserDto: LoginUserDto):Promise<User> {
    const { email, password} = loginUserDto;
    
    const user = await this.userModel.findOne({ email }).select({ password: 1, email: 1 });
    if(!user) throw new UnauthorizedException('Invalid Email');
    
    const isMatch = bcrypt.compareSync(password, user.password);
    if(!isMatch) throw new UnauthorizedException('Invalid Password');
    
    return {
      ...user, 
      token: this.getJwtToken({ email: user.email})
    };
    
  }
  
  
  private handleDBErrors(error: any): never {
    if(error.code === 11000) {
      const field = Object.keys(error.keyValue);
      const value = Object.values(error.keyValue);
      throw new BadRequestException(`The ${field} ${value} already exists`);
    }
      console.log(error)
      throw new InternalServerErrorException('Please check server logs errors')
  }
  
  private getJwtToken(payload: JwtPayload){
    const token = this.jwtService.sign(payload);
    return token;
  }

}
